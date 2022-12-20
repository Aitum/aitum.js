# aitum.js

<p align="center">
    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMDAgMTAwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjQyNi40Nyw3My4yNCA5MjYuNDYsNTczLjIyIDkyNi40Niw3My4yNCAiLz4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3My41NCw3MTkuMzMgNTczLjUzLDIxOS4zNSA3My41NCwyMTkuMzUgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iOTI2LjQ2LDU3My4yMiAyMTkuMzcsNTczLjIyIDU3Mi45Miw5MjYuNzYgIi8+Cjwvc3ZnPgo=" />
    <br />
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

## Methods

**NOTE: REWRITE IN PROGRESS, BELOW IS NOT COMPLETE AND MAY BE INCORRECT**

The methods in this library correspond to the methods listed in the [Public API documentation](https://docs.aitum.tv/en/api).

### Devices

#### Getting Devices

There are multiple ways to filter 

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
TODO 

#### AITUM
* `triggerRule(rule: string | Rule)` - Trigger a rule in Aitum. (Note: When triggering a rule with this method, any triggers and checks in the rule are ignored, and the actions are immediately executed)
* `playSound(path: string, volume: number)` - Play a sound in Aitum
* `stopAllSounds()` - Stop all sounds playing in Aitum

#### ELGATO
TODO

#### OSC
TODO


### Rules
TODO

### Global Variables
TODO

### Utilities

#### Logger
TODO - In built logger

#### HTTP Calls
TODO - Easy access to axios

#### JSON Support
TODO - Examples of how to serialise and deserialise JSON in JS

## TypeScript support
This library is designed with TypeScript in mind, so provides various TypeScript interface definitions for objects returned by methods in this library. You can import them from `./interfaces/`.