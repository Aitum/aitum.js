import { AitumJS } from '../AitumJS';
import { DeviceType } from '../enums/DeviceType';
import { HostType } from '../enums/HostType';
import { IDeviceSearchParams } from '../interfaces/IDeviceSearchParams';
import { AllDevices } from '../types/AllDevices';
import { DeviceEnumToClassReturnType } from '../types/DeviceEnumToClassReturnType';

/**
 * Class representing a host in Aitum. A host is a master or worker process connected to an Aitum network.
 * @see {@link https://docs.aitum.tv/en/multipc}
 */
export class Host {

  constructor(public readonly id: string, public readonly name: string, public readonly type: HostType) {}

  /**
   * Get devices
   *
   * @description Get all devices under this host
   */
  public async getDevices<T extends DeviceType>(type: T, filters?: Partial<IDeviceSearchParams>): Promise<InstanceType<DeviceEnumToClassReturnType<T>>[]> {
    return AitumJS.get().aitum.getDevices(type, {...filters, host: this.id });
  }


}