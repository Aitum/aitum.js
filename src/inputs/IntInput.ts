import { InputType } from '~/enums';
import { INumberInputValidation } from '~/interfaces/INumberInputValidation';

export class IntInput {
  public readonly type = InputType.INT;

  constructor(public readonly label: string, public readonly validation: INumberInputValidation) {}
}