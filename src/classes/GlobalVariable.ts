import { AitumCC } from '~/AitumCC';
import { DeviceType, InputType } from '~/enums';

export class GlobalVariable {

  constructor(public readonly id: string, public readonly name: string, public readonly type: InputType, value: string | string[] | number | boolean) {}

  /**
   * Update variable
   *
   * @description updates the variable
   */
  public async update(value: string | string[] | number | boolean): Promise<void> {
    // Get aitum device, do trigger call
    const lib = AitumCC.get().getAitumJS();
    await lib.aitum.setGlobalVariable(this.id, value);
  }
}