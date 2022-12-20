import { AitumJS } from '~/AitumJS';
import { Rule } from '~/classes/Rule';
import { DeviceType } from '~/enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an MIDI device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/midi}
 */
export class MIDIDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.MIDI, host);
  }

  // Actions

  /**
   * Send a Note On.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} note - The MIDI note.
   * @param {number} velocity - The velocity of the signal.
   * @returns {Promise<void>}
   */
  public async noteOn(channel: number, note: number, velocity: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 0,
      channel,
      note,
      velocity
    });
  }

  /**
   * Send a Note Off.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} note - The MIDI note.
   * @param {number} velocity - The velocity of the signal.
   * @returns {Promise<void>}
   */
  public async noteOff(channel: number, note: number, velocity: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 1,
      channel,
      note,
      velocity
    });
  }

  /**
   * Send a Note On followed by a Note Off.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} note - The MIDI note.
   * @param {number} velocity - The velocity of the signal.
   * @param {number} hold - The time between note on & off in ms.
   * @returns {Promise<void>}
   */
  public async noteOnOff(channel: number, note: number, velocity: number, hold: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 16,
      channel,
      note,
      velocity,
      hold
    });
  }

  /**
   * Send a Control Change.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} value - The MIDI value.
   * @param {number} controller - The MIDI controller.
   * @returns {Promise<void>}
   */
  public async controlChange(channel: number, value: number, controller: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 2,
      channel,
      value,
      controller
    });
  }

  /**
   * Send a Program.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} number - The MIDI number.
   * @returns {Promise<void>}
   */
  public async program(channel: number, number: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 3,
      channel,
      number
    });
  }

  /**
   * Send a Poly Aftertouch.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} note - The MIDI note.
   * @param {number} velocity - The velocity of the signal.
   * @returns {Promise<void>}
   */
  public async polyAftertouch(channel: number, note: number, velocity: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 4,
      channel,
      note,
      velocity
    });
  }

  /**
   * Send a Channel Aftertouch.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} pressure - The MIDI pressure.
   * @returns {Promise<void>}
   */
  public async channelAftertouch(channel: number, pressure: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 5,
      channel,
      pressure
    });
  }

  /**
   * Send a Pitch.
   *
   * @param {number} channel - The MIDI channel.
   * @param {number} value - The MIDI value.
   * @returns {Promise<void>}
   */
  public async pitch(channel: number, value: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 6,
      channel,
      value
    });
  }

  /**
   * Send a Position.
   *
   * @param {number} value - The MIDI value.
   * @returns {Promise<void>}
   */
  public async position(value: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 7,
      value
    });
  }

  /**
   * Send a Select.
   *
   * @param {number} value - The MIDI song.
   * @returns {Promise<void>}
   */
  public async select(song: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 9,
      song
    });
  }

  /**
   * Send a Start.
   *
   * @returns {Promise<void>}
   */
  public async start(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 11
    });
  }

  /**
   * Send a Continue.
   *
   * @returns {Promise<void>}
   */
  public async continue(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 12
    });
  }

  /**
   * Send a Stop.
   *
   * @returns {Promise<void>}
   */
  public async stop(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 13
    });
  }

  /**
   * Send an Active Sense.
   *
   * @returns {Promise<void>}
   */
  public async activeSense(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 14
    });
  }

  /**
   * Send a Reset.
   *
   * @returns {Promise<void>}
   */
  public async reset(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 15
    });
  }

}