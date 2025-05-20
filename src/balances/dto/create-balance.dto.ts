import { Account } from '../../accounts/entities/account.entity';
import { IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNumber()
  accountId: number;

  @IsNumber()
  currentBalance: number;

  constructor(props: Partial<CreateBalanceDto>) {
    Object.assign(this, props);
  }

  get account() {
    return new Account(this.accountId);
  }
}
