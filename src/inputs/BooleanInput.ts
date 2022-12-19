import { InputType } from '~/enums';
import { ISimpleInputValidation } from '~/interfaces/ISimpleInputValidation';

export class BooleanInput {
  public readonly type = InputType.BOOLEAN;

  constructor(public readonly label: string, public readonly validation: ISimpleInputValidation) {}
}