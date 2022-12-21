import { AitumCC } from '~/AitumCC';
import { DeviceType } from '~/enums';

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
    // Get aitum device, do trigger call
    const lib = AitumCC.get().getAitumJS();
    const device = (await lib.getDevices(DeviceType.AITUM))[0];

    if (!device) throw new Error('Couldn\'t find Twitch device');

    await device.triggerRule(this.id)
  }
}