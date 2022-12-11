import type { AxiosError } from 'axios';
import { AitumDevice } from './classes/AitumDevice';
import { ElgatoDevice } from './classes/ElgatoDevice';
import { MIDIDevice } from './classes/MIDIDevice';
import { OBSV5Device } from './classes/OBSV5Device';
import { OSCDevice } from './classes/OSCDevice';
import { TwitchDevice } from './classes/TwitchDevice';
import { DeviceType } from './enums/DeviceType';
import { DeviceEnumToClassReturnType } from './types/DeviceEnumToClassReturnType';

/**
 * API error handler
 *
 * @description Deals with axios errors and returns a string
 *
 * @param {Object} error - Response object from Axios
 *
 * @returns {String}
 */
export function apiErrorHandler(error: AxiosError): string {
  if (error.response) {
    return (error.response as { data: { error: string } }).data.error;
  } else if (error.request) {
    return 'Request timed out, please ensure Aitum is running.';
  } else {
    console.log('aitum.js request error', error.message);
    return error.message;
  }
}

export function deviceCreator<T extends DeviceType>(name: string, type: T, host: string): InstanceType<DeviceEnumToClassReturnType<T>> {
  switch (type) {
    case DeviceType.OBSV5:
      return new OBSV5Device(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    case DeviceType.MIDI:
      return new MIDIDevice(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    case DeviceType.TWITCH:
      return new TwitchDevice(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    case DeviceType.AITUM:
      return new AitumDevice(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    case DeviceType.ELGATO:
      return new ElgatoDevice(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    case DeviceType.OSC:
      return new OSCDevice(name, host) as InstanceType<DeviceEnumToClassReturnType<T>>;
    default:
      return null as never;
  }
}

export function deviceEnumToClass<T extends DeviceType>(type: T): DeviceEnumToClassReturnType<T> {
  switch (type) {
    case DeviceType.OBSV5:
      return OBSV5Device as DeviceEnumToClassReturnType<T>;
    case DeviceType.MIDI:
      return MIDIDevice as DeviceEnumToClassReturnType<T>;
    case DeviceType.TWITCH:
      return TwitchDevice as DeviceEnumToClassReturnType<T>;
    case DeviceType.AITUM:
      return AitumDevice as DeviceEnumToClassReturnType<T>;
    case DeviceType.ELGATO:
      return ElgatoDevice as DeviceEnumToClassReturnType<T>;
    case DeviceType.OSC:
      return OSCDevice as DeviceEnumToClassReturnType<T>;
    default:
      return null as never;
  }
}