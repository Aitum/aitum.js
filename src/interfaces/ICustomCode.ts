import { ICCActionInputs } from '~/interfaces/ICCActionInputs';

export interface ICustomCode {
  name: string;
  inputs: ICCActionInputs;
  method: (inputs: { [key: string]: number | string | boolean | string[] }) => Promise<void>;
}