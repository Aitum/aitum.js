// TODO: Error handler
import { Axios, AxiosError } from 'axios';

// deals with axios errors and returns a string
const apiErrorHandler = (error: AxiosError): string => {
  if (error.response) {
    return (error.response as { data: { error: string }}).data.error;
  } else if (error.request) {
    return 'Request timed out, please ensure Aitum is running.';
  } else {
    console.log('aitum.js request error', error.message);
    return error.message;
  }
}

export {
  apiErrorHandler
};