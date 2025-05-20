import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { BalancesModule } from '../balances/balances.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [AccountsModule, BalancesModule, EventsModule],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
