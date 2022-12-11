import { AxiosInstance } from 'axios';

import { apiErrorHandler } from '../Utils';
import { IHypeTrainInfo, IPollInfo } from '../interfaces';

/**
 * Class for Twitch-related routes on the Aitum Public API.
 * @see {@link https://docs.aitum.tv/api/twitch}
 */
export class Twitch {
  private constructor(private base: AxiosInstance) {}
  private static instance: Twitch = null;

  public static get(base?: AxiosInstance): Twitch {
    if (!Twitch.instance && base) Twitch.instance = new Twitch(base);
    return Twitch.instance;
  }

  /**
   * Get the current Twitch Hype Train.
   * @returns {Promise<IHypeTrainInfo>}
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
   * Get the current Twitch poll.
   * @returns {Promise<IPollInfo>}
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
