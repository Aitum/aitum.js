import cors from '@koa/cors';
import axios from 'axios';
import chalk from 'chalk';
import Router from 'koa-router';
import { AitumJS } from '~/AitumJS';
import { InputType } from '~/enums/InputType';
import { IInternalAction } from '~/interfaces/IInternalAction';
import { createHash } from 'crypto';
import bonjour from 'bonjour';
import Koa, { Context } from 'koa';
import bodyparser from 'koa-bodyparser';
import { ICCActionInputs } from '~/interfaces/ICCActionInputs';
import { ICustomCode } from '~/interfaces/ICustomCode';
import { BooleanInput, StringListInput, StringInput, IntInput, FloatInput} from './inputs';

export class AitumCC {

  private constructor() {}

  private static instance: AitumCC = null;

  public static get(): AitumCC {
    if (!AitumCC.instance) {
      AitumCC.instance = new AitumCC();
      AitumCC.instance.startKoa();
    }
    return AitumCC.instance;
  }

  // Get pre-configured version of AitumJS
  public getAitumJS(): AitumJS {
    if (!this.connected) return null;
    return AitumJS.get(this.masterIP);
  }

  // Actions
  private actions: IInternalAction[] = [];

  // Adding actions
  public registerAction(cc: ICustomCode) {
    // TODO: Check name is greater than 1 length

    // TODO: Check for duplicates

    this.actions.push({
      id: createHash('sha1').update(cc.name).digest('hex'),
      name: cc.name,
      inputs: cc.inputs,
      method: cc.method
    });

    console.log(`${chalk.blue.bold('AitumCC')}: Registered Action: ${cc.name}`);
  }

  // Invoking actions
  public async invokeAction(id: string, inputs: { [key: string]: number | string | boolean | string[] }): Promise<void> {
    const findAction = this.actions.find(a => a.id === id);

    if (!findAction) {
      console.log(`${chalk.red.bold('AitumCC')}: Cannot find action with hash ${id}`);
      return;
    }

    console.log(`${chalk.blue.bold('AitumCC')}: Running ${findAction.name}`);

    await findAction.method(inputs);
  }

  // Handshake/registration
  private hostId: string = null;
  private hostName: string = null;
  private apiKey: string = null;
  private masterIP: string = null;
  private masterBase: string = null;
  private connected = false;

  // Set env
  public setEnv(hostId: string, hostName: string, apiKey: string): void {
    this.hostId = hostId;
    this.hostName = hostName;
    this.apiKey = apiKey;
  }

  // Shitty IPV4 Check
  private isIPV4(ip: string): boolean {
    return ip.split('.').length === 4;
  }

  // Find master
  private async findAitum(): Promise<string> {
    return new Promise((resolve, reject) => {
      bonjour().findOne({ type: 'pebble' }, service => {

        let foundIPV4 = false

        for (let address of service.addresses) {
          if (this.isIPV4(address)) {
            foundIPV4 = true;
            this.masterIP = address;
            resolve(`http://${address}:7777`);
          }
        }

        if (!foundIPV4) {
          console.log(`${chalk.red.bold('AitumCC')}: Cannot find IPV4 address for this host. Please make sure IPV4 is available on your local network.`);
          return;
        }

      });
    });
  }

  // Actually connect
  public async connect(): Promise<void> {
    if (this.hostId === null) {
      console.log(`${chalk.red.bold('AitumCC')}: Prevented connection to Aitum as there was no host ID set.`);
      return;
    }

    if (this.hostName === null) {
      console.log(`${chalk.red.bold('AitumCC')}: Prevented connection to Aitum as there was no host name set.`);
      return;
    }

    if (this.apiKey === null) {
      console.log(`${chalk.red.bold('AitumCC')}: Prevented connection to Aitum as there was no API key set.`);
      return;
    }

    if (this.connected) {
      console.log(`${chalk.red.bold('AitumCC')}: Prevented connection to Aitum as there is already an active connection.`);
      return;
    }

    // Find the master
    this.masterBase = await this.findAitum();

    // try to connect, use host id
    const connectCall = await axios.post(`${this.masterBase}/cc/register`, {
      id: this.hostId,
      name: this.hostName,
      actions: this.actions.map(a => {
        return {
          id: a.id,
          inputs: a.inputs,
          name: a.name
        }
      })
    }, {
      validateStatus: () => true,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      }
    });

    // check result
    if (connectCall.status !== 200) { // Something didn't go right.
      console.log(`${chalk.red.bold('AitumCC')}: Error connecting: ${connectCall.data.error}`);
      console.log(`${chalk.red.bold('AitumCC')}: Debug info: ${connectCall}`);
      throw new Error(connectCall.data.error);
      return;
    }

    console.log(`${chalk.blue.bold('AitumCC')}: Connected successfully!`);
    this.connected = true;

    this.startHeartbeat();
  }

  // Webserver
  private koa: Koa = null;

  private startKoa(): void {
    this.koa = new Koa();

    this.koa.use(cors({
      origin: (ctx: Context) => {
        return ctx.get('origin');
      }
    }));

    this.koa.use(bodyparser());

    this.koa.listen(7252, () => {
      console.log(`${chalk.blue.bold('AitumCC')}: Webserver started`);
    })

    // Routes
    const router = new Router();

    // Healthcheck
    router.get('/hc', ctx => { ctx.body = 'OK'; });

    // CC Triggering
    router.post('/rules/:ruleId', async ctx => {

      try {
        await this.invokeAction(ctx.params.ruleId, ctx.request.body as { [key: string]: number | string | boolean | string[] } ?? {});
      } catch (err) {
        console.log(`${chalk.red.bold('AitumCC')}: Error executing rule: ${err}`);
      }

      ctx.body = 'ok';
    });

    // Hookup
    this.koa.use(router.routes());
  }

  private stopKoa(): void {}

  // Heartbeating
  private heartbeatTask: NodeJS.Timer = null;

  private startHeartbeat(): void {
    this.heartbeatTask = setInterval(() => this.heartbeatLogic(), 1e4);
  }

  private stopHeartbeat(): void {
    clearInterval(this.heartbeatTask);
  }

  private async heartbeatLogic(): Promise<void> {
    if (this.connected) {
      // Check we can ping master
      try {
        const masterHC = await axios.get(`http://${this.masterIP}:7777/`, {
          validateStatus: () => true,
          timeout: 2500
        });
        
        if (masterHC.status !== 200) {
          this.stopHeartbeat();
          console.log(`${chalk.red.bold('AitumCC')}: Aitum instance disconnected. Attempting to reconnect.`);
          setTimeout(() => {
            AitumCC.instance.connected = false;
            AitumCC.instance.connect();
          }, 250);
        }
      } catch (err) {
        this.stopHeartbeat();
        console.log(`${chalk.red.bold('AitumCC')}: Aitum instance disconnected. Attempting to reconnect.`);
        // console.log(err);
        setTimeout(() => {
          AitumCC.instance.connected = false;
          AitumCC.instance.connect();
        }, 250);
      }
    } else {
      this.stopHeartbeat();
    }
  }


}

export {
  InputType,
  ICCActionInputs,
  ICustomCode,
  BooleanInput,
  FloatInput,
  IntInput,
  StringInput,
  StringListInput,
};