import { AxiosInstance } from "axios";

import { apiErrorHandler } from "../Utils";
import { IHypeTrainInfo } from "../interfaces/IHypeTrainInfo";
import { IPollInfo } from "../interfaces/IPollInfo";

export class Twitch {
  public constructor(private readonly base: AxiosInstance) {}

  /**
   * Get hype train
   *
   * @description Get hype train info
   */
  public async getHypeTrain(): Promise<IHypeTrainInfo> {
    try {
      const call = await this.base.get("twitch/hypetrain");
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  /**
   * Get poll
   *
   * @description Get the data from a poll
   */
  public async getPoll(): Promise<IPollInfo> {
    try {
      const call = await this.base.get("twitch/poll");
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }
}
