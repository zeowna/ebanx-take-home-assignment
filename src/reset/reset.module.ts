import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { BalancesModule } from 'src/balances/balances.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [AccountsModule, BalancesModule, EventsModule],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
