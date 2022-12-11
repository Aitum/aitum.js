import { Axios, AxiosInstance } from 'axios';
import { Host } from '../classes';
import { BaseDevice } from '../classes/BaseDevice';
import { DeviceType } from '../enums/DeviceType';
import { IDeviceSearchParams } from '../interfaces/IDeviceSearchParams';
import { AllDevices } from '../types/AllDevices';

import { apiErrorHandler, deviceCreator } from '../Utils';
import { IGlobalVariable } from '../interfaces/IGlobalVariable';
import { IRule } from '../interfaces/IRule';

export class Aitum {
  /* Rules calls */

  private constructor(private base: AxiosInstance) {}
  private static instance: Aitum = null;

  public static get(base?: AxiosInstance): Aitum {
    if (!Aitum.instance && base) Aitum.instance = new Aitum(base);
    return Aitum.instance;
  }

  /**
   * Get rules
   *
   * @description Get all Aitum rules
   */
  public async getRules(): Promise<IRule[]> {
    try {
      const call = await this.base.get('aitum/rules');

      let rules: IRule[] = [];

      for (const [k, v] of Object.entries(call.data.data)) {
        rules.push({ name: k, id: v as string });
      }

      return rules;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /**
   * Trigger a rule
   *
   * @description Trigger an Aitum rule
   *
   * @param rule - Rule to trigger
   */
  public async triggerRule(rule: IRule | string): Promise<void> {
    try {
      const ruleId = typeof rule === 'object' ? rule.id : rule;

      await this.base.get(`aitum/rules/${ruleId}`);
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /**
   * Trigger an Aitum action.
   * @param {BaseDevice} device - Device to trigger the action on.
   * @param {object} data - Action data.
   * @returns {Promise<void>}
   */
  public async triggerAction(device: BaseDevice, data: object): Promise<void> {
    try {
      await this.base.post(`devices`, {
        device: {
          host: device.host,
          type: device.type,
          name: device.name
        },
        data
      });
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /* Variable calls */

  /**
   * Get global variables
   *
   * @description Get all global variables
   *
   * @returns
   */
  public async getGlobalVariables(): Promise<IGlobalVariable[]> {
    try {
      const call = await this.base.get('aitum/state');

      let vars: IGlobalVariable[] = [];

      for (const state of call.data.data) {
        vars.push({
          id: state['_id'],
          name: state.name,
          type: state.type,
          value: state.value,
        });
      }

      return vars;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  // Set global var
  // TODO

  /* Info Getters */

  /**
   * Get hosts
   *
   * @description Get all connected Aitum hosts
   */
  public async getHosts(): Promise<Host[]> {
    try {
      const call = await this.base.get('hosts');

      let hosts: Host[] = [];

      for (const host of call.data.data) {
        hosts.push(new Host(host.id, host.name, host.type));
      }

      return hosts;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /**
   * Get devices.
   * @returns {Promise<AllDevices[]>}
   */
  public async getDevices<T extends DeviceType>(type: T, filters?: Partial<IDeviceSearchParams>): Promise<InstanceType<DeviceEnumToClassReturnType<T>>[]> {
    try {
      const call = await this.base.get('devices');

      let devices: InstanceType<DeviceEnumToClassReturnType<T>>[] = [];

      for (const device of call.data.data) {

        // If filters are provided, let's check them
        if (filters) {
          if (filters.hasOwnProperty('host')) {
            if (filters.host !== device.host) continue;
          }

          if (filters.hasOwnProperty('type')) {
            if (filters.type !== device.type) continue;
          }

          if (filters.hasOwnProperty('name')) {
            if (filters.name !== device.name) continue;
          }
        }

        const parsed = deviceCreator(device.name, device.type, device.host);
        if (parsed) devices.push(parsed as InstanceType<DeviceEnumToClassReturnType<T>>);
      }

      return devices;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }
}
