import { HostType } from '../enums/HostType';
import { IDeviceSearchParams } from '../interfaces/IDeviceSearchParams';

export class Host {

  constructor(public readonly id: string, public readonly name: string, public readonly type: HostType) {}

  /**
   * Get devices
   *
   * @description Get all devices
   */
  public async getDevices(filters?: Partial<IDeviceSearchParams>): Promise<void> {

  }

}