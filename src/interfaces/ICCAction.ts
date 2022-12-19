import { ICCActionInputs } from '~/interfaces/ICCActionInputs';

export interface ICCAction {
  id: string;
  inputs: ICCActionInputs;
  name: string;
}
