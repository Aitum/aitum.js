/*
  Aitum API Client
  Instance this to interact with Aitum's Public API.
 */

import axios, { AxiosInstance } from "axios";

import { Aitum } from "./API/Aitum";
import { Twitch } from "./API/Twitch";

export class AitumAPIClient {
  private readonly apiBase: AxiosInstance;

  public readonly aitum: Aitum;
  public readonly twitch: Twitch;

  public constructor(private readonly ip = "127.0.0.1") {
    this.apiBase = axios.create({
      baseURL: `http://${ip}:7777/`,
      timeout: 2500,
    });

    this.aitum = new Aitum(this.apiBase);
    this.twitch = new Twitch(this.apiBase);
  }
}
