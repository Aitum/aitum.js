import { AitumCC } from '~/AitumCC';
import { Redemption } from '~/classes/Redemption';
import { DeviceType } from '~/enums';

export class RedemptionGroup {

  constructor(public readonly id: string, public readonly name: string, public readonly redemptions: string[], public enabled: boolean) {
  }

  public async getRedemptions(): Promise<Redemption[]> {
    const lib = AitumCC.get().getAitumJS();
    return (await lib.getRedemptions()).filter(r => this.redemptions.includes(r.id));
  }

  public async enable(): Promise<void> {
    const lib = AitumCC.get().getAitumJS();

    // Get device
    const device = (await lib.getDevices(DeviceType.TWITCH))[0];

    if (!device) throw new Error('Couldn\'t find Twitch device');

    await lib.aitum.triggerAction(device, {
      type: 7,
      id: this.id
    });
  }

  public async disable(): Promise<void> {
    const lib = AitumCC.get().getAitumJS();

    // Get device
    const device = (await lib.getDevices(DeviceType.TWITCH))[0];

    if (!device) throw new Error('Couldn\'t find Twitch device');

    await lib.aitum.triggerAction(device, {
      type: 6,
      id: this.id
    });
  }

}