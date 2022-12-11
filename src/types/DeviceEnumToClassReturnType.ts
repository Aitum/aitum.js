import { AitumDevice } from '../classes/AitumDevice';
import { ElgatoDevice } from '../classes/ElgatoDevice';
import { MIDIDevice } from '../classes/MIDIDevice';
import { OBSV5Device } from '../classes/OBSV5Device';
import { OSCDevice } from '../classes/OSCDevice';
import { TwitchDevice } from '../classes/TwitchDevice';
import { DeviceType } from '../enums/DeviceType';

export type DeviceEnumToClassReturnType<T> =
  T extends DeviceType.OBSV5 ? typeof OBSV5Device :
  T extends DeviceType.TWITCH ? typeof TwitchDevice :
  T extends DeviceType.OSC ? typeof OSCDevice :
  T extends DeviceType.ELGATO ? typeof ElgatoDevice :
  T extends DeviceType.MIDI ? typeof MIDIDevice :
  T extends DeviceType.AITUM ? typeof AitumDevice :
  never;