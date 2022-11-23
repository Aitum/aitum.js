import { AxiosInstance } from 'axios';

import { apiErrorHandler } from '../Utils';
import { IGlobalVariable } from '../interfaces/IGlobalVariable';
import { IRule } from '../interfaces/IRule';

export class Aitum {
  public constructor(private readonly base: AxiosInstance) {}

  /* Rules calls */

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
}
