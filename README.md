<p align="center">
    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMDAgMTAwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjQyNi40Nyw3My4yNCA5MjYuNDYsNTczLjIyIDkyNi40Niw3My4yNCAiLz4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3My41NCw3MTkuMzMgNTczLjUzLDIxOS4zNSA3My41NCwyMTkuMzUgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iOTI2LjQ2LDU3My4yMiAyMTkuMzcsNTczLjIyIDU3Mi45Miw5MjYuNzYgIi8+Cjwvc3ZnPgo=" />
    <br />
    <a href="https://docs.aitum.tv/api">API Documentation</a>
    <br />
    <a href="https://www.npmjs.com/package/aitum.js">
        <img alt="npm" src="https://img.shields.io/npm/v/aitum.js?style=flat-square">
    </a>
</p>


# aitum.js
JS/TS library for Aitum's Public API. This library requires [Aitum](https://aitum.tv) to be installed and running. You can read the API documentation [here](https://docs.aitum.tv/en/api).

The main goal of this library is to provide an easy-to-use wrapper for using Aitum's public API, instead of having to spend the time implementing your own logic to make requests.

## Installation

To install this module, please follow the steps below for your package manager of choice:

```sh
# npm
npm i -s aitum.js

# yarn
yarn add aitum.js
```

## Getting Started

To get started, import and instantiate the library.

```ts

import { AitumAPIClient } from 'aitum.js';

// Instantiate the library
// You can optionally provide an IP address to the machine running Aitum. It will default to 127.0.0.1
const client = new AitumAPIClient(); 

// Example: Trigger an Aitum rule using its ID
client.aitum.triggerRule('R07MKX77BAxGkcuL');

```

## Methods
The methods in this library correspond to the methods listed in the [Public API documentation](https://docs.aitum.tv/en/api).

### `AitumAPIClient.aitum` - Aitum-related methods
* `getRules()` - Get all Aitum rules
* `triggerRule(rule: IRule | string)` - Trigger an Aitum rule
* `getGlobalVariables()` - Get all global variables

### `AitumAPIClient.twitch` - Twitch-related methods
* `getHypeTrain()` - Get the current Hype Train
* `getPoll()` - Get the current poll

## TypeScript support
This library is designed with TypeScript in mind, so provides various TypeScript interface definitions for objects returned by methods in this library. You can import them from `./interfaces/`.