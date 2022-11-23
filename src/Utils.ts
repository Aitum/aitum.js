// TODO: Error handler

import type { AxiosError } from 'axios';

/**
 * API error handler
 *
 * @description Deals with axios errors and returns a string
 *
 * @param {Object} error - Response object from Axios
 *
 * @returns {String}
 */
export function apiErrorHandler(error: AxiosError): string {
  if (error.response) {
    return (error.response as { data: { error: string } }).data.error;
  } else if (error.request) {
    return 'Request timed out, please ensure Aitum is running.';
  } else {
    console.log('aitum.js request error', error.message);
    return error.message;
  }
}
