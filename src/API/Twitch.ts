import { AxiosInstance } from 'axios';

import { apiErrorHandler } from '../Utils';
import { IHypeTrainInfo } from '../interfaces/IHypeTrainInfo';
import { IPollInfo } from '../interfaces/IPollInfo';

export class Twitch {
  private constructor(private base: AxiosInstance) {}
  private static instance: Twitch = null;

  public static get(base?: AxiosInstance): Twitch {
    if (!Twitch.instance && base) Twitch.instance = new Twitch(base);
    return Twitch.instance;
  }

  /**
   * Get hype train
   *
   * @description Get the current Hype Train
   */
  public async getHypeTrain(): Promise<IHypeTrainInfo> {
    try {
      const call = await this.base.get('twitch/hypetrain');
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /**
   * Get poll
   *
   * @description Get the current poll
   */
  public async getPoll(): Promise<IPollInfo> {
    try {
      const call = await this.base.get('twitch/poll');
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }
}
