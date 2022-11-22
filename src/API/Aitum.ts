import axios, { AxiosInstance } from 'axios';
import { IRule } from '../interfaces/IRule';

export class Aitum {

  public constructor(private readonly base: AxiosInstance) {}

  public async getRules(): Promise<IRule[]> {
    try {
      const call = await this.base.get('aitum/rules');

      let rules: IRule[] = [];

      for (const [k, v] of Object.entries(call.data.data)) {

      }

      return rules;
    } catch (err) {
      //
    }
  }
}