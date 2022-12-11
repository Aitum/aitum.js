import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an Elgato device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/elgato}
 */
export class ElgatoDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.ELGATO, host);
  }
}