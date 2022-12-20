import { AitumJS } from '~/AitumJS';
import { Rule } from '~/classes/Rule';
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

  // Actions

  /**
   * Send a Float.
   *
   * @param {string} address - Address to send to.
   * @param {number} value - Value to send.
   * @returns {Promise<void>}
   */
  public async float(address: string, value: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 0,
      address,
      value
    });
  }

  /**
   * Send a Integer.
   *
   * @param {string} address - Address to send to.
   * @param {number} value - Value to send.
   * @returns {Promise<void>}
   */
  public async integer(address: string, value: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 1,
      address,
      value
    });
  }

  /**
   * Send a String.
   *
   * @param {string} address - Address to send to.
   * @param {string} value - Value to send.
   * @returns {Promise<void>}
   */
  public async string(address: string, value: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 2,
      address,
      value
    });
  }

  /**
   * Send a Boolean.
   *
   * @param {string} address - Address to send to.
   * @param {boolean} value - Value to send.
   * @returns {Promise<void>}
   */
  public async boolean(address: string, value: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 4,
      address,
      value
    });
  }

  /**
   * Send a Null.
   *
   * @param {string} address - Address to send to.
   * @returns {Promise<void>}
   */
  public async null(address: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 3,
      address
    });
  }
}