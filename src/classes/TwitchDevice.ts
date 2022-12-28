import { AitumJS } from '~/AitumJS';
import { DeviceType } from '~/enums/DeviceType';
import { TwitchChatAnnounceColour } from '~/enums/TwitchChatAnnounceColour';
import { IPollInfo } from '~/interfaces';
import { BaseDevice } from './BaseDevice';

/**
 * Class representing a Twitch device. This class should not be instantiated manually.
 * @extends BaseDevice
 * @see {@link https://docs.aitum.tv/en/devices/twitch}
 */
export class TwitchDevice extends BaseDevice {
  constructor(name: string, host: string) {
    super(name, DeviceType.TWITCH, host);
  }

  // Actions

  /**
   * Start a Commercial
   *
   * @param {number} length - The length of the commercial to run.
   * @returns {Promise<void>}
   */
  public async startCommercial(length: number): Promise<void> {
    const allowedValues = [30, 60, 90, 120, 150, 180];
    if (!allowedValues.includes(length)) throw new Error('Commercial length must be between 30-180 seconds in steps of 30');

    await AitumJS.get().aitum.triggerAction(this, {
      type: 9,
      length
    });
  }

  /**
   * Create a Stream Marker
   *
   * @returns {Promise<void>}
   */
  public async createStreamMarker(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 10
    });
  }

  /**
   * Starts a new Poll
   *
   * @param {string} title - The title of the poll.
   * @param {number} duration - The duration of the poll.
   * @param {string[]} choices - The choices for the poll (2-5).
   * @param {boolean} pointsVoting - Can a user vote additional times with channel points.
   * @param {string} pointsPerVote - If pointsVoting is enabled, what is the price per vote.
   * @returns {Promise<void>}
   */
  public async startPoll(title: string, duration: number, choices: string[], pointsVoting = false, pointsPerVote?: number): Promise<void> {
    if (choices.length < 2 || choices.length > 5) throw new Error('Polls require 2-5 choices');
    if (pointsVoting === true && typeof pointsPerVote !== 'number') throw new Error('Points voting requires an integer amount for pointsPerVote');

    await AitumJS.get().aitum.triggerAction(this, {
      type: 11,
      title,
      duration,
      pointsVoting,
      pointsPerVote,
      choiceOne: choices[0],
      choiceTwo: choices[1],
      choiceThree: choices.length > 2 ? choices[2] : undefined,
      choiceFour: choices.length > 3 ? choices[3] : undefined,
      choiceFive: choices.length > 4 ? choices[4] : undefined
    });
  }

  /**
   * Ends a poll if one is active
   *
   * @returns {Promise<void>}
   */
  public async endPoll(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 12
    });
  }

  /**
   * Gets the active poll if one is running
   *
   * @returns {Promise<IPollInfo>}
   */
  public async getPoll(): Promise<IPollInfo> {
    return AitumJS.get().twitch.getPoll();
  }

  /**
   * Sends an announcement
   *
   * @param {string} message - The announcement message.
   * @param {TwitchChatAnnounceColour} colour - The announcement colour (Note: not implemented yet, will be soon).
   * @returns {Promise<void>}
   */
  public async announcement(message: string, colour?: TwitchChatAnnounceColour): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 17,
      message,
      announceType: null // TODO: Add colour once implemented
    });
  }

  /**
   * Ban/unbans a user
   *
   * @param {boolean} ban - If the user should be banned or unbanned.
   * @param {string} username - The username to target.
   * @param {string} reason - Reason for the ban, if banning.
   * @returns {Promise<void>}
   */
  public async setBanStatus(ban: boolean, username: string, reason?: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: ban ? 18 : 19,
      username,
      reason: (ban && reason) ? reason : undefined
    });
  }

  /**
   * Sets emote only mode
   *
   * @param {boolean} enabled - Emote only mode on or off.
   * @returns {Promise<void>}
   */
  public async emoteOnly(enabled: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 20,
      enabled
    });
  }

  /**
   * Sets follower only mode
   *
   * @param {boolean} enabled - Follower only mode on or off.
   * @returns {Promise<void>}
   */
  public async followerOnly(enabled: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 21,
      enabled
    });
  }

  /**
   * VIPs/unVIPs a user
   *
   * @param {boolean} vip - If the user should be VIP or not.
   * @param {string} username - The username to target.
   * @returns {Promise<void>}
   */
  public async setVIP(vip: boolean, username: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 24,
      username,
      enabled: vip
    });
  }

  /**
   * Starts a raid
   *
   * @param {string} username - The username to target.
   * @returns {Promise<void>}
   */
  public async raid(username: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 26,
      username
    });
  }

  /**
   * Sets subscriber only mode
   *
   * @param {boolean} enabled - Subscriber only mode on or off.
   * @returns {Promise<void>}
   */
  public async subOnlyMode(enabled: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 31,
      enabled
    });
  }

  /**
   * Timeouts/untimeouts a user
   *
   * @param {boolean} timeout - If the user should be timed out or not.
   * @param {string} username - The username to target.
   * @param {string} reason - Reason for the timeout, if timing out.
   * @returns {Promise<void>}
   */
  public async setTimeoutStatus(timeout: boolean, username: string, reason?: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: timeout ? 32 : 33,
      username,
      reason: (timeout && reason) ? reason : undefined
    });
  }

  /**
   * Clear chat
   *
   * @returns {Promise<void>}
   */
  public async clearChat(): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 34
    });
  }

  /**
   * Mod/unmod a user
   *
   * @param {boolean} mod - If the user should be a moderator or not.
   * @param {string} username - The username to target.
   * @returns {Promise<void>}
   */
  public async setModStatus(mod: boolean, username: string): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 35,
      username,
      enabled: mod
    });
  }

  /**
   * Sets unique chat mode
   *
   * @param {boolean} enabled - Unique chat mode on or off.
   * @returns {Promise<void>}
   */
  public async uniqueChat(enabled: boolean): Promise<void> {
    await AitumJS.get().aitum.triggerAction(this, {
      type: 36,
      enabled
    });
  }

  /**
   * Sends a message as the broadcaster
   *
   * @param {string} message - Message to send.
   * @returns {Promise<void>}
   */
  public async sendMessage(message: string): Promise<void> {
    if (message.length === 0 || message.length > 500) throw new Error('Messages for Twitch chats need to be between 1-500 characters');

    await AitumJS.get().aitum.triggerAction(this, {
      type: 37,
      message
    });
  }

  /**
   * Sets the stream title
   *
   * @param {string} title - Stream title to set.
   * @returns {Promise<void>}
   */
  public async setTitle(title: string): Promise<void> {
    if (title.length === 0 || title.length > 140) throw new Error('Titles for Twitch streams need to be between 1-140 characters');

    await AitumJS.get().aitum.triggerAction(this, {
      type: 39,
      title
    });
  }

}