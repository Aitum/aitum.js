import { DeviceType } from '../enums/DeviceType';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing an OBS V5 device. This class should not be instantiated manually.
 * @extends BaseDevice
 */
export class OBSV5Device extends BaseDevice {

  constructor(name: string, host: string) {
    super(name, DeviceType.OBSV5, host);
  }

  // Actions

  /**
   * Change the current OBS scene.
   * @param {string} scene - The name of the scene to switch to.
   * @returns {Promise<void>}
   */
  public async changeScene(scene: string): Promise<void> {
    // TODO
  }

  /**
   * Change a source filter's visibility.
   * @param {string} source - The name of the source.
   * @param {string} filter - The name of the filter to modify.
   * @param {boolean} enabled - Whether the filter should be visible or not.
   * @returns {Promise<void>}
   */
  public async changeFilterVisibility(source: string, filter: string, enabled: boolean): Promise<void> {
   // TODO
  }

  /**
   * Change the visibility of a specific source in a scene.
   * @param {string} scene - The name of the scene.
   * @param {string} item - The name of the source in the scene.
   * @param {boolean} visible - Whether the source should be visible or not.
   * @returns {Promise<void>}
   */
  public async changeSceneItemVisibility(scene: string, item: string, visible: boolean): Promise<void> {
    // TODO
  }

  /**
   * Change the mute state of an audio device.
   * @param {string} input - The name of the audio device.
   * @param {boolean} mute - Whether the audio device should be muted or not.
   * @returns {Promise<void>}
   */
  public async muteAudio(input: string, mute: boolean): Promise<void> {
    // TODO
  }

  /**
   * Change the play/pause state of a media source.
   * @param {string} source - The name of the source.
   * @param {boolean} play - Whether the media source should play.
   * @returns {Promise<void>}
   */
  public async playPauseMedia(source: string, play: boolean): Promise<void> {
    // TODO
  }

  /**
   * Restart a media source.
   * @param {string} source - The name of the source.
   * @returns {Promise<void>}
   */
  public async restartMedia(source: string): Promise<void> {
    // TODO
  }

  /**
   * Stop a media source.
   * @param {string} source - The name of the source.
   * @returns {Promise<void>}
   */
  public async stopMedia(source: string): Promise<void> {
    // TODO
  }

  /**
   * Play the next media item.
   * @param {string} source - The name of the source.
   * @returns {Promise<void>}
   */
  public async nextMediaItem(source: string): Promise<void> {
    // TODO
  }

  /**
   * Play the previous media item.
   * @param {string} source - The name of the source.
   * @returns {Promise<void>}
   */
  public async previousMediaItem(source: string): Promise<void> {
    // TODO
  }

  /**
   * Refresh a browser source.
   * @param {string} source - The name of the source.
   * @returns {Promise<void>}
   */
  public async refreshBrowserSource(source: string): Promise<void> {
    // TODO
  }

  /**
   * Set recording state.
   * @param {boolean} state - Whether to record or not.
   * @returns {Promise<void>}
   */
  public async setRecording(state: boolean): Promise<void> {
    // TODO
  }

  /**
   * Toggle recording state.
   * @returns {Promise<void>}
   */
  public async toggleRecording(): Promise<void> {
    // TODO
  }

  /**
   * Set streaming state.
   * @param {boolean} state - Whether to start streaming or not.
   * @returns {Promise<void>}
   */
  public async setStreaming(state: boolean): Promise<void> {
    // TODO
  }

  /**
   * Toggle streaming state.
   * @returns {Promise<void>}
   */
  public async toggleStreaming(): Promise<void> {
    // TODO
  }

  /**
   * Set replay buffer state.
   * @param {boolean} state - Whether to start the replay buffer or not.
   * @returns {Promise<void>}
   */
  public async setReplayBuffer(state: boolean): Promise<void> {
    // TODO
  }

  /**
   * Toggle replay buffer state. If the replay buffer has already started, it will stop, and vice-versa.
   * @returns {Promise<void>}
   */
  public async toggleReplayBuffer(): Promise<void> {
    // TODO
  }

  /**
   * Save current replay buffer.
   * @returns {Promise<void>}
   */
  public async saveReplayBuffer(): Promise<void> {
    // TODO
  }

  /**
   * Send a custom `obs-websocket` message. This is usually not very useful unless you have code interfacing directly with obs-websocket.
   * @param {object} data - The data to send in the message.
   * @returns {Promise<void>}
   */
  public async sendCustomMessage(data: object): Promise<void> {
    // TODO - Also stringify the data prior to api send
  }

  /**
   * Set browser source properties.
   * @param {string} source - The name of the source.
   * @param {object} options - The options for the browser source.
   * @param {string} [options.url] - The URL of the browser source.
   * @param {number} [options.fps] - The FPS of the browser source.
   * @param {boolean} [options.routeAudio] - Whether to route the audio of this source to OBS or not.
   * @returns {Promise<void>}
   */
  public async setBrowserSourceProperties(source: string, options: { url?: string, fps?: number, routeAudio?: boolean }): Promise<void> {
    // TODO - validation on number of keys > 0, spread options before send, ensure fps is int
  }

  /**
   * Set display source properties.
   * @param {string} source - The name of the source.
   * @param {object} options - The options for the display source.
   * @param {number} [options.display] - The monitor to display on. This is a number representing the ID of the monitor.
   * @param {boolean} [options.showCursor] - Whether to show the mouse cursor or not.
   * @returns {Promise<void>}
   */
  public async setDisplaySourceProperties(source: string, options: { display?: number, showCursor?: boolean }): Promise<void> {
    // TODO - ensure display is int, spread options
  }

  /**
   * Set text source properties.
   * @param {string} source - The name of the source.
   * @param {object} options - The options for the text source.
   * @param {string} [options.text] - The text for the source.
   * @param {boolean} [options.dropShadow] - Whether to show a drop shadow or not.
   * @param {boolean} [options.outline] - Whether to show an outline or not.
   * @param {boolean} [options.antiAliasing] - Whether to turn on anti-aliasing or not.
   * @param {boolean} [options.wordWrap] - Whether to turn on word wrap or not.
   * @param {string} [options.colour] - The first colour to use for the text source.
   * @param {string} [options.colourTwo] - The second colour to use for the text source.
   * @returns {Promise<void>}
   */
  public async setTextSourceProperties(source: string, options: { text?: string, dropShadow?: boolean, outline?: boolean, antiAliasing?: boolean, wordWrap?: boolean, colour?: string, colourTwo?: string }): Promise<void> {
    // TODO - spread options
  }

  /**
   * Set source filter properties.
   * @param {string} source - The name of the source.
   * @param {string} filter - The name of the filter.
   * @param {object} options - The options to set for this source filter. The expected parameters of this object depends on the type of filter selected.
   * @returns {Promise<void>}
   */
  public async setSourceFilterProperties(source: string, filter: string, options: object): Promise<void> {
    // TODO - stringify options
  }

  /**
   * Send vendor request.
   * @param {string} vendorName - The name of the vendor.
   * @param {string} eventType - The name of the event.
   * @param {object} eventData - The event's data.
   * @returns {Promise<void>}
   */
  public async sendVendorRequest(vendorName: string, eventType: string, eventData?: object): Promise<void> {
    // TODO - stringify eventData
  }

}