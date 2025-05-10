import { Injectable } from '@nestjs/common';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { CreateDepositEventService } from './create-deposit-event.service';
import { CreateTransferEventService } from './create-transfer-event.service';
import { CreateWithdrawEventService } from './create-withdraw-event';
import { EventTypesEnum } from './entities/event-types.enum';

@Injectable()
export class CreateEventServiceFactory {
  constructor(
    private readonly createDepositEventServiceTsService: CreateDepositEventService,
    private readonly createWithdrawEventService: CreateWithdrawEventService,
    private readonly createTransferEventService: CreateTransferEventService,
  ) {}

  getServiceByType<T = AbstractCreateEventService>(
    type: EventTypesEnum,
  ): T | null {
    switch (type) {
      case EventTypesEnum.Deposit: {
        return this.createDepositEventServiceTsService as T;
      }
      case EventTypesEnum.Withdraw: {
        return this.createWithdrawEventService as T;
      }
      case EventTypesEnum.Transfer: {
        return this.createTransferEventService as T;
      }
      default:
        return null;
    }
  }
}
