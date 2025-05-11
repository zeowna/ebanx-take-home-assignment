import { Account } from 'src/accounts/entities/account.entity';

export class CreateBalanceDto {
  accountId: number;
  currentBalance: number;

  constructor(props: Partial<CreateBalanceDto>) {
    Object.assign(this, props);
  }

  get account() {
    return new Account(this.accountId);
  }
}
