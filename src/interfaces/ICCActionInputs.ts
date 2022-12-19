import { InputType } from '~/enums';
import { IInputValidation } from '~/interfaces/IInputValidation';

export interface ICCActionInputs {
  [key: string]: { type: InputType, label: string, validation?: IInputValidation };
}