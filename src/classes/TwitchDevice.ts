import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing a Twitch device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/twitch}
 */
export class TwitchDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.TWITCH, host);
  }
}