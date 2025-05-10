import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { BalancesService } from '../balances/balances.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateBalanceDto } from 'src/balances/dto/create-balance.dto';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

@Injectable()
export class ResetService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly eventsService: EventsService,
    private readonly balancesService: BalancesService,
  ) {}

  async resetState() {
    await this.balancesService.deleteAll();
    await this.accountsService.deleteAll();
    await this.eventsService.deleteAll();

    await Promise.all([
      this.accountsService.create(
        new CreateAccountDto({
          id: 100,
          name: 'Account 01',
          nationalRegister: '0000000000',
        }),
      ),
      this.accountsService.create(
        new CreateAccountDto({
          id: 300,
          name: 'Account 02',
          nationalRegister: '0000000000',
        }),
      ),
    ]);

    await Promise.all([
      this.balancesService.create(
        new CreateBalanceDto({ accountId: 100, currentBalance: 0 }),
      ),
      this.balancesService.create(
        new CreateBalanceDto({ accountId: 300, currentBalance: 0 }),
      ),
    ]);
  }
}
