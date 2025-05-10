export class CreateAccountDto {
  id: number;
  name: string;
  /**
   * CPF
   */
  nationalRegister: string;

  constructor(props: Partial<CreateAccountDto>) {
    Object.assign(this, props);
  }
}
