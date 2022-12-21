import { AitumCC } from '~/AitumCC';
import { DeviceType } from '~/enums';
import { ITwitchRedemption } from '~/interfaces/ITwitchRedemption';

export class Redemption implements ITwitchRedemption {

  public background: string;
  public cost: number;
  public enabled: boolean;
  public globalCooldown: number;
  public maxPerStream: number | null;
  public maxPerUserPerStream: number | null;
  public paused: boolean;
  public prompt: string;
  public title: string;

  constructor(public readonly id: string, data: ITwitchRedemption) {
    // Pull data in
    for (const [k,v] of Object.entries(data)) {
      this[k] = v;
    }
  }


  public async update(data: Partial<ITwitchRedemption>): Promise<void> {
    // Get twitch device, do update call
    const lib = AitumCC.get().getAitumJS();
    const device = (await lib.getDevices(DeviceType.TWITCH))[0];

    if (!device) throw new Error('Couldn\'t find Twitch device');

    await lib.aitum.triggerAction(device, {
      type: 1,
      ...data,
      id: this.id
    });

    // Update this instance in the case that it's potentially reused.
    for (const [k, v] of Object.entries(data)) {
      this[k] = v;
    }
  }
}