import { DeviceType } from '../enums/DeviceType';

export interface IDeviceSearchParams {
  host: string;
  type?: DeviceType;
  name: string;
}