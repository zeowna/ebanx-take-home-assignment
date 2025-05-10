import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BalancesService } from 'src/balances/balances.service';
import { DataSource } from 'typeorm';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Injectable()
export class CreateDepositEventService extends AbstractCreateEventService {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    protected readonly eventsService: EventsService,
    private readonly balancesService: BalancesService,
  ) {
    super(dataSource, eventsService);
  }

  async execute(createEventDto: CreateEventDto) {
    const queryRunner = await this.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      const destinationBalance = await this.balancesService.sumBalance(
        createEventDto.destination!,
        createEventDto.amount,
        queryRunner,
      );

      if (!destinationBalance) {
        return null;
      }

      const event = await this.eventsService.create(
        createEventDto,
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
