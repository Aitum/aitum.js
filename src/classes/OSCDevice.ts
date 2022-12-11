import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an OSC device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/osc}
 */
export class OSCDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.OSC, host);
  }
}