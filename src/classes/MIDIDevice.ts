import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an Aitum device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/midi}
 */
export class MIDIDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.MIDI, host);
  }
}