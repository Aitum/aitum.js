/*
  Aitum API Client
  Instance this to interact with Aitum's Public API.
 */

import axios, { AxiosInstance } from 'axios';
import { Aitum } from './API/Aitum';
import { Twitch } from './API/Twitch'

export class AitumAPIClient {

  private apiBase: AxiosInstance;

  private internalAitum: Aitum;
  private internalTwitch: Twitch;

  public constructor(private readonly ip = '127.0.0.1') {
    this.apiBase = axios.create({
      baseURL: `${ip}:7777/`,
      timeout: 2500
    });

    this.internalAitum = new Aitum(this.apiBase);
    this.internalTwitch = new Twitch(this.apiBase);

  }






}