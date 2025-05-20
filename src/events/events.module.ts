import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { BalancesModule } from '../balances/balances.module';
import { CreateDepositEventService } from './create-deposit-event.service';
import { CreateEventServiceFactory } from './create-event-service.factory';
import { CreateWithdrawEventService } from './create-withdraw-event.service';
import { CreateTransferEventService } from './create-transfer-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), BalancesModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    CreateDepositEventService,
    CreateWithdrawEventService,
    CreateTransferEventService,
    CreateEventServiceFactory,
  ],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
