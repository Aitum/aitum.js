export class Rule {

  public constructor(private readonly name: string, private readonly id: string) {}

  /**
   * Trigger rule
   *
   * @description triggers the rule
   */
  public async trigger(): Promise<void> {
    // TODO
  }
}