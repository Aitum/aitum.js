# aitum.js

<p align="center">
    <a href="https://docs.aitum.tv/api">API Documentation</a>
    <br />
    <a href="https://www.npmjs.com/package/aitum.js">
        <img alt="npm" src="https://img.shields.io/npm/v/aitum.js?style=flat-square">
    </a>
</p>

JS/TS library for Aitum's Public API. This library requires [Aitum](https://aitum.tv) to be installed and running. You can read the API documentation [here](https://docs.aitum.tv/en/api).

The main goal of this library is to provide an easy-to-use wrapper for using Aitum's public API, instead of having to spend the time implementing your own logic to make requests.

If you are looking for a more integrated way to do custom code with Aitum, please take a look at our [Custom Code Wrapper](https://github.com/aitum/aitum-cc) project.

## Installation

To install this module, please follow the steps below for your package manager of choice:

```sh
# npm
npm i -s aitum.js

# yarn
yarn add aitum.js
```

## Getting Started

To get started, import and instantiate the library via its `get` method.

```ts
import { AitumJS } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';

// Instantiate the library
// You can optionally provide an IP address to the machine running Aitum. It will default to 127.0.0.1
const lib = AitumJS.get(); 

// Example: Trigger an Aitum rule using its ID

// Grab all devices, filtered by Aitum devices, grab the first one.
const aitumDevice = (await lib.getDevices(DeviceType.Aitum))[0];
await aitumDevice.triggerRule('rule-id');


// Example: Change to a specific scene on OBS

// Grab all devices, filtered by OBS devices, grab the first one.
const obsDevice = (await lib.getDevices(DeviceType.OBS))[0];
await obsDevice.changeScene('my awesome scene');
```

## Usage

**NOTE: REWRITE IN PROGRESS, BELOW IS NOT COMPLETE AND MAY BE INCORRECT**

The methods in this library mostly correspond to the methods listed in the [Public API documentation](https://docs.aitum.tv/en/api).

### Devices

#### Getting Devices

There are multiple ways to filter down to get a single device, below are a few examples:

```ts
import { AitumJS } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';

// Instantiate the library
// You can optionally provide an IP address to the machine running Aitum. It will default to 127.0.0.1
const lib = AitumJS.get();

// Filter all devices by the type we want to find
const allOBSDevices = await lib.getDevices(DeviceType.OBSV5);

// If you have more info for filtering ahead of time
const singleOBSDevice = (await lib.getDevices(DeviceType.OBSV5, { host: 'aitum-host-id', name: 'device-name' }))[0];
```

#### OBS (Websocket 5+)

For interfacing with OBS (WS 5 and later) devices.

##### Methods
* `changeScene(scene: string)` - Change the current OBS scene
* `changeFilterVisibility(source: string, filter: string, enabled: boolean)` - Change a source filter's visibility
* `changeSceneItemVisibility(scene: string, item: string, visible: boolean)` - Change the visibility of a specific source in a scene
* `muteAudio(input: string, mute: boolean)` - Change the mute state of an audio device
* `playPauseMedia(source: string, play: boolean)` - Change the play/pause state of a media source
* `restartMedia(source: string)` - Restart a media source
* `stopMedia(source: string)` - Stop a media source
* `nextMediaItem(source: string)` - Play the next media item
* `previousMediaItem(source: string)` - Play the previous media item
* `refreshBrowserSource(source: string)` - Refresh a browser source
* `setRecording(state: boolean)` - Set recording state
* `toggleRecording()` - Toggle recording state
* `setStreaming(state: boolean)` - Set streaming state
* `toggleStreaming()` - Toggle streaming state
* `setReplayBuffer(state: boolean)` - Set replay buffer state
* `toggleReplayBuffer()` - Toggle replay buffer state
* `saveReplayBuffer()` - Save current replay buffer
* `sendCustomMessage(data: object)` - Send a custom `obs-websocket` message. This is usually not very useful unless you have code interfacing directly with obs-websocket
* `setBrowserSourceProperties(source: string, options: { url?: string, fps?: number, routeAudio?: boolean })` - Set browser source properties
* `setDisplaySourceProperties(source: string, options: { display?: number, showCursor?: boolean })` - Set display source properties
* `setTextSourceProperties(source: string, options: { text?: string, dropShadow?: boolean, outline?: boolean, antiAliasing?: boolean, wordWrap?: boolean, colour?: string, colourTwo?: string })` - Set text source properties
* `setSourceFilterProperties(source: string, filter: string, options: object)` - Set source filter properties
* `sendVendorRequest(vendorName: string, eventType: string, eventData?: object)` - Send vendor request

#### MIDI

For interfacing with MIDI devices.

##### Methods
* `noteOn(channel: number, note: number, velocity: number)` - Send a Note On
* `noteOff(channel: number, note: number, velocity: number)` - Send a Note Off
* `noteOnOff(channel: number, note: number, velocity: number, hold: number)` - Send a Note On followed by a Note Off
* `controlChange(channel: number, value: number, controller: number)` - Send a Control Change
* `program(channel: number, number: number)` - Send a Program
* `polyAftertouch(channel: number, note: number, velocity: number)` - Send a Poly Aftertouch
* `channelAftertouch(channel: number, pressure: number)` - Send a Channel Aftertouch
* `pitch(channel: number, value: number)` - Send a Pitch
* `position(value: number)` - Send a Position
* `select(song: number)` - Send a Select
* `start()` - Send a Start
* `continue()` - Send a Continue
* `stop()` - Send a Stop
* `activeSense()` - Send an Active Sense
* `reset()` - Send a Reset


#### TWITCH

For interfacing with Twitch.

If you're looking for how to interact with Twitch Redemptions, please check [here](#redemptions).

##### Methods
* `startCommercial(length: number)` - Start a Commercial
* `createStreamMarker()` - Create a Stream Marker
* `startPoll(title: string, duration: number, choices: string[], pointsVoting = false, pointsPerVote?: number)` - Starts a new Poll
* `endPoll()` - Ends a poll if one is active
* `getPoll()` - Gets the active poll if one is running
* `announcement(message: string, colour?: TwitchChatAnnounceColour)` - Sends an announcement
* `setBanStatus(ban: boolean, username: string, reason?: string)` - Ban/unbans a user
* `emoteOnly(enabled: boolean)` - Sets emote only mode
* `followerOnly(enabled: boolean)` - Sets follower only mode
* `setVIP(vip: boolean, username: string)` - VIPs/unVIPs a user
* `raid(username: string)` - Starts a raid
* `subOnlyMode(enabled: boolean)` - Sets subscriber only mode
* `setTimeoutStatus(timeout: boolean, username: string, reason?: string)` - Timeouts/untimeouts a user
* `clearChat()` - Clear chat
* `setModStatus(mod: boolean, username: string)` - Mod/unmod a user
* `uniqueChat(enabled: boolean)` - Sets unique chat mode
* `sendMessage(message: string)` - Sends a message as the broadcaster
* `setTitle(title: string)` - Sets the stream title

#### AITUM

For interfacing with Aitum's in built tools.

##### Methods
* `triggerRule(rule: string | Rule)` - Trigger a rule in Aitum. (Note: When triggering a rule with this method, any triggers and checks in the rule are ignored, and the actions are immediately executed)
* `playSound(path: string, volume: number)` - Play a sound in Aitum
* `stopAllSounds()` - Stop all sounds playing in Aitum

#### ELGATO

For interfacing with Elgato Key Lights & Light Strips.

##### Methods
* `setState(on: boolean)` - Set the light state
* `setColour(colour: string)` - Set the light colour
* `setColourTemperature(temperature: number, brightness: number)` - Set the light colour temperature

#### OSC

For interfacing with OSC devices.

##### Methods
* `float(address: string, value: number)` - Send a Float
* `integer(address: string, value: number)` - Send a Integer
* `string(address: string, value: string)` - Send a String
* `boolean(address: string, value: boolean)` - Send a Boolean
* `null(address: string)` - Send a Null


### <a name="redemptions"></a> Twitch Redemptions

#### Redemptions

##### Getting Redemptions

Use your AitumJS instance to get Redemptions, e.g.
```ts
await AitumJS.get().getRedemptions();
```

##### Methods
* `update(data: Partial<ITwitchRedemption>)` - Update a Redemption

#### Redemption Groups

##### Getting Redemption Groups

Use your AitumJS instance to get Redemption Groups, e.g.
```ts
await AitumJS.get().getRedemptionGroups();
```

##### Methods
* `getRedemptions()` - Get all Redemptions in this Group
* `enable()` - Enable the Redemption Group
* `disable()` - Disable the Redemption Group

### Rules
##### Getting Rules

Use your AitumJS instance to get Rules, e.g.
```ts
await AitumJS.get().getRules();
```

##### Methods
* `trigger()` - Trigger the rule

### Global Variables
Use your AitumJS instance to get Global Variables, e.g.
```ts
await AitumJS.get().getVariables();
```

##### Methods
* `update(value: string | string[] | number | boolean)` - Update the variable

### Utilities

#### HTTP client
For ease of use, we expose the library `axios` for you to use yourself in any HTTP requests you would like to make (even non-Aitum ones). You can call it by using:

```ts
// GET request
const get = await AitumJS.http.get('https://api.example.com');

// POST request
const post = await AitumJS.http.post('https://api.example.com', {foo: 'bar'}, {
  headers: {
    'User-Agent': 'My Example User Agent'
  }
});
```

You can learn more about how to use `axios` and its methods on its [documentation](https://axios-http.com/docs/intro).

### Further reading
As we expect that some people using this library may be new to JavaScript/TypeScript, we recommend learning the core concepts of the language before diving straight in. We also recommend [this video series](https://www.youtube.com/watch?v=Wt47gSihb5s&list=PLJjxqjPti-LfbLhTs-XSNecyqBOtRB0fS). Here's some common mistakes:

#### JSON objects
Everything in aitum.js is a class object. However, if you are writing your own code and making requests to other API services, you may need to serialise and de-serialise JSON. If you use our exposed HTTP client (`axios`), this should be done automatically for you. If you need to serialise and de-serialise JSON, use:

```ts
// Serialise to string
const d = {foo: "bar"};
const asString = JSON.stringify(d); // returns {foo: "bar"} as a string

// Deserialise to JS object
const d2 = '{foo: "bar"}';
const asObject = JSON.parse(d2); // returns {foo: "bar"} as an object
```


## TypeScript support
This library is designed with TypeScript in mind, so provides various TypeScript interface definitions for objects returned by methods in this library. You can import them from `aitum.js/lib/interfaces/`.