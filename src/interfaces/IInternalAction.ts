import { ICCAction } from '~/interfaces/ICCAction';

export interface IInternalAction extends ICCAction {
  method: (inputs: { [key: string]: number | string | boolean | string[] }) => Promise<void>
}