import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalancesModule } from './balances/balances.module';
import { EventsModule } from './events/events.module';
import { ResetModule } from './reset/reset.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BalancesModule,
    EventsModule,
    AccountsModule,
    ResetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
