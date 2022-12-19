import { InputType } from '~/enums';
import { ISimpleInputValidation } from '~/interfaces/ISimpleInputValidation';

export class StringListInput {
  public readonly type = InputType.STRING_LIST;

  constructor(public readonly label: string, public readonly validation: ISimpleInputValidation) {}
}