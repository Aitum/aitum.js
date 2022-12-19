import { InputType } from '~/enums';
import { INumberInputValidation } from '~/interfaces/INumberInputValidation';

export class FloatInput {
  public readonly type = InputType.FLOAT;

  constructor(public readonly label: string, public readonly validation: INumberInputValidation) {}
}