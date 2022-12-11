import { AitumJS } from '../AitumJS';
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
    await AitumJS.get().aitum.triggerAction(this, {
      type: 2,
      rule: rule instanceof Rule ? rule : rule
    });
  }

  /**
   * Play a sound in Aitum.
   * @param {string} path - The path to the sound on your filesystem.
   * @returns {Promise<void>}
   */
  public async playSound(path: string, volume: number): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 4,
      file: path,
      volume
    });
  }

  /**
   * Stop all sounds playing in Aitum.
   * @returns {Promise<void>}
   */
  public async stopAllSounds(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 5
    });
  }

}