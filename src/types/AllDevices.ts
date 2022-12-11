import { AitumDevice } from '../classes/AitumDevice';
import { ElgatoDevice } from '../classes/ElgatoDevice';
import { MIDIDevice } from '../classes/MIDIDevice';
import { OBSV5Device } from '../classes/OBSV5Device';
import { OSCDevice } from '../classes/OSCDevice';
import { TwitchDevice } from '../classes/TwitchDevice';

export type AllDevices = AitumDevice | OBSV5Device | ElgatoDevice | MIDIDevice | OSCDevice | TwitchDevice;