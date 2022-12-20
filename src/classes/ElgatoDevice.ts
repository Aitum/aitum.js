import { AitumJS } from '~/AitumJS';
import { ElgatoColourMode } from '~/enums';
import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an Elgato device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/elgato}
 */
export class ElgatoDevice extends BaseDevice {
  constructor(name: string, host: string, public readonly colourMode: ElgatoColourMode) {
    super(name, DeviceType.ELGATO, host);
  }

  // Actions
  /**
   * Set the light state.
   *
   * @param {boolean} on - The state of the light.
   * @returns {Promise<void>}
   */
  public async setState(on: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 0,
      on
    });
  }

  /**
   * Set the light colour.
   *
   * @param {string} colour - RGB colour to set the light to.
   * @returns {Promise<void>}
   */
  public async setColour(colour: string): Promise<void> {
    if (this.colourMode !== ElgatoColourMode.HSB) return; // Invalid call for CT device
    if (colour.length !== 6) return; // Colour given not valid

    // Convert RGB to HSB
    let r = parseInt(colour.substr(0, 2), 16) / 255;
    let g = parseInt(colour.substr(2, 2), 16) / 255;
    let b = parseInt(colour.substr(4, 2), 16) / 255;

    const v = Math.max(r, g, b)
    const n = v - Math.min(r, g, b);
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;

    await AitumJS.get().aitum.triggerAction(this, {
      type: 1,
      hue: 60 * (h < 0 ? h + 6 : h),
      saturation: v && (n / v) * 100,
      brightness: v * 100
    });
  }

  /**
   * Set the light colour temperature.
   *
   * @param {number} temperature - Colour temperature to set the light to.
   * @param {number} brightness - brightness to set the light to.
   * @returns {Promise<void>}
   */
  public async setColourTemperature(temperature: number, brightness: number): Promise<void> {
    if (this.colourMode !== ElgatoColourMode.CT) return; // Invalid call for HSB device

    await AitumJS.get().aitum.triggerAction(this, {
      type: 1,
      temperature,
      brightness
    });
  }


}