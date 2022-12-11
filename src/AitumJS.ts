/*
  Aitum API Client
  Instance this to interact with Aitum's Public API.
 */

import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';

import { Aitum } from './API/Aitum';
import { Twitch } from './API/Twitch';
import { Host } from './classes';
import { Rule } from './classes/Rule';
import { DeviceType } from './enums/DeviceType';
import { IDeviceSearchParams } from './interfaces/IDeviceSearchParams';
import { DeviceEnumToClassReturnType } from './types/DeviceEnumToClassReturnType';

export class AitumJS {
  private readonly apiBase: AxiosInstance;

  public aitum: Aitum;
  public twitch: Twitch;

  private constructor(private readonly ip = '127.0.0.1') {
    this.apiBase = axios.create({
      baseURL: `http://${ip}:7777/`,
      timeout: 2500,
    });

    this.aitum = Aitum.get(this.apiBase);
    this.twitch = Twitch.get(this.apiBase);
  }

  private static instance: AitumJS = null;

  public static get(ip?: string): AitumJS {
    if (!AitumJS.instance) AitumJS.instance = new AitumJS(ip);
    return AitumJS.instance;
  }

  public async getRules(): Promise<Rule[]> {
    // return this.aitum.getRules();
    console.log(`${chalk.red.bold('Aitum.JS')}: Rules are currently not implemented and will be added in a further release.`);
    return []; // TODO
  }

  public async getHosts(): Promise<Host[]> {
    return this.aitum.getHosts();
  }

  public async getDevices<T extends DeviceType>(type: T, filters?: Partial<IDeviceSearchParams>): Promise<InstanceType<DeviceEnumToClassReturnType<T>>[]> {
    return this.aitum.getDevices(type, filters);
  }

  public async sleep(timeMs: number): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), timeMs));
  }
}
