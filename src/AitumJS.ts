/*
  Aitum API Client
  Instance this to interact with Aitum's Public API.
 */

import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';
import { Redemption } from '~/classes/Redemption';
import { RedemptionGroup } from '~/classes/RedemptionGroup';

import { Aitum } from './API/Aitum';
import { Twitch } from './API/Twitch';
import { GlobalVariable, Host } from './classes';
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
    return this.aitum.getRules();
  }

  public async getRedemptions(): Promise<Redemption[]> {
    return this.twitch.getRedemptions();
  }

  public async getRedemptionGroups(): Promise<RedemptionGroup[]> {
    return this.twitch.getRedemptionGroups();
  }

  public async getHosts(): Promise<Host[]> {
    return this.aitum.getHosts();
  }

  public async getDevices<T extends DeviceType>(type: T, filters?: Partial<IDeviceSearchParams>): Promise<InstanceType<DeviceEnumToClassReturnType<T>>[]> {
    return this.aitum.getDevices(type, filters);
  }

  public async getVariables(): Promise<GlobalVariable[]> {
    return this.aitum.getGlobalVariables();
  }

  public async sleep(timeMs: number): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), timeMs));
  }
}
