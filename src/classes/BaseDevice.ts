import { Aitum } from '../API/Aitum';
import { DeviceType } from '../enums/DeviceType';

/**
 * Abstract class representing a device.
 */
export abstract class BaseDevice {

  protected constructor(public readonly name: string, public readonly type: DeviceType, public readonly host: string) {}

  private async fireAction(data: { type: number, [key: string]: string | number | string[] | object }): Promise<void> {
    await Aitum.get().triggerAction(this, data);
  }

}