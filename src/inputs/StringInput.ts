import { InputType } from '~/enums';
import { IStringInputValidation } from '~/interfaces/IStringInputValidation';

export class StringInput {
  public readonly type = InputType.STRING;

  constructor(public readonly label: string, public readonly validation: IStringInputValidation) {}
}