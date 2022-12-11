/**
 * Class representing a rule in Aitum.
 * @see {@link https://docs.aitum.tv/en/rules}
 */
export class Rule {

  public constructor(public readonly name: string, public readonly id: string) {}

  /**
   * Trigger rule
   *
   * @description triggers the rule
   */
  public async trigger(): Promise<void> {
    // TODO
  }
}