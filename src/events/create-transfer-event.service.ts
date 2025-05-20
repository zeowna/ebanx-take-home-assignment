import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BalancesService } from '../balances/balances.service';
import { DataSource } from 'typeorm';
import { AbstractCreateEventService } from './abstract-create-event.service';
import { EventsService } from './events.service';
import { CreateTransferEventDto } from './dto/create-transfer-event.dto';

@Injectable()
export class CreateTransferEventService extends AbstractCreateEventService {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    protected readonly eventsService: EventsService,
    private readonly balancesService: BalancesService,
  ) {
    super(dataSource, eventsService);
  }

  async execute(createEventDto: CreateTransferEventDto) {
    const queryRunner = await this.createQueryRunner();

    try {
      await queryRunner.startTransaction('SERIALIZABLE');

      const [originBalance, destinationBalance] = await Promise.all([
        this.balancesService.subtractBalance(
          createEventDto.origin,
          createEventDto.amount,
          queryRunner,
        ),
        this.balancesService.sumBalance(
          createEventDto.destination,
          createEventDto.amount,
          queryRunner,
        ),
      ]);

      if (!originBalance || !destinationBalance) {
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
