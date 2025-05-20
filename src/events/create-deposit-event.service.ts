import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BalancesService } from '../balances/balances.service';
import { DataSource } from 'typeorm';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { EventsService } from './events.service';
import { CreateDepositEventDto } from './dto/create-deposit-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class CreateDepositEventService extends AbstractCreateEventService {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    protected readonly eventsService: EventsService,
    private readonly balancesService: BalancesService,
  ) {
    super(dataSource, eventsService);
  }

  async execute(createEventDto: CreateDepositEventDto) {
    const queryRunner = await this.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      const destinationBalance = await this.balancesService.sumBalance(
        createEventDto.destination,
        createEventDto.amount,
        queryRunner,
      );

      if (!destinationBalance) {
        return null;
      }

      const event = await this.eventsService.create(
        createEventDto as CreateEventDto,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return {
        destination: {
          id: event.destination!.id,
          balance: destinationBalance.currentBalance,
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
