import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BalancesService } from 'src/balances/balances.service';
import { DataSource } from 'typeorm';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Injectable()
export class CreateWithdrawEventService extends AbstractCreateEventService {
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

      const originBalance = await this.balancesService.subtractBalance(
        createEventDto.origin!,
        createEventDto.amount,
      );

      if (!originBalance) {
        return null;
      }

      const event = await this.eventsService.create(
        createEventDto,
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
