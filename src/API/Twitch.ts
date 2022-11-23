import { AxiosInstance } from "axios";
import { IHypeTrainInfo } from "../interfaces/IHypeTrainInfo";
import { IPollInfo } from "../interfaces/IPollInfo";
import { apiErrorHandler } from "../Utils";

export class Twitch {
  public constructor(private readonly base: AxiosInstance) {}

  // Get hype train
  public async getHypeTrain(): Promise<IHypeTrainInfo> {
    try {
      const call = await this.base.get("twitch/hypetrain");
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }

  // Get poll
  public async getPoll(): Promise<IPollInfo> {
    try {
      const call = await this.base.get("twitch/poll");
      return call.data.data;
    } catch (err: any) {
      throw new Error(apiErrorHandler(err));
    }
  }
}
