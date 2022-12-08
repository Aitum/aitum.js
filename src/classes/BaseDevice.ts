import { DeviceType } from '../enums/DeviceType';

/**
 * Abstract class representing a device.
 */
export abstract class BaseDevice {

  protected constructor(public readonly name: string, public readonly type: DeviceType, public readonly host: string) {}

}