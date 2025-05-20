import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BalancesService } from '../balances/balances.service';
import { DataSource } from 'typeorm';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { EventsService } from './events.service';
import { CreateWithdrawEventDto } from './dto/create-withdraw-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class CreateWithdrawEventService extends AbstractCreateEventService {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    protected readonly eventsService: EventsService,
    private readonly balancesService: BalancesService,
  ) {
    super(dataSource, eventsService);
  }

  async execute(createEventDto: CreateWithdrawEventDto) {
    const queryRunner = await this.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const originBalance = await this.balancesService.subtractBalance(
        createEventDto.origin,
        createEventDto.amount,
      );

      if (!originBalance) {
        return null;
      }

      const event = await this.eventsService.create(
        createEventDto as CreateEventDto,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return {
        origin: {
          id: event.origin!.id,
          balance: originBalance.currentBalance,
        },
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
