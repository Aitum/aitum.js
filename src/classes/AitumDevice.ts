import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';
import { Rule } from './Rule';

/**
 * Class representing an Aitum device. This class should not be instantiated manually.
 * @extends BaseDevice
 */
export class AitumDevice extends BaseDevice {

  constructor(name: string, host: string) {
    super(name, DeviceType.AITUM, host);
  }

  // Actions

  /**
   * Trigger a rule in Aitum.
   *
   * When triggering a rule with this method, any triggers and checks in the rule are ignored, and the actions are immediately executed.
   * @param {string | Rule} rule - Either a `Rule` or a string representing a rule ID.
   * @returns {Promise<void>}
   */
  public async triggerRule(rule: string | Rule): Promise<void> {
    // TODO
  }

  /**
   * Play a sound in Aitum.
   * @param {string} path - The path to the sound on your filesystem.
   * @returns {Promise<void>}
   */
  public async playSound(path: string): Promise<void> {
    // TODO
  }

  /**
   * Stop all sounds playing in Aitum.
   * @returns {Promise<void>}
   */
  public async stopAllSounds(): Promise<void> {
    // TODO
  }

}