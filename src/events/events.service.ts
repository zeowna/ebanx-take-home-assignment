import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { AbstractEntityService } from 'src/common/services/abstract-entity-service.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class EventsService extends AbstractEntityService<Event> {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    @InjectRepository(Event)
    protected readonly repository: Repository<Event>,
  ) {
    super(dataSource, repository);
  }

  async create(createEventDto: CreateEventDto, queryRunner?: QueryRunner) {
    const origin = new Account(createEventDto.origin);
    const destination = new Account(createEventDto.destination);

    return super.create(
      { ...createEventDto, origin, destination },
      queryRunner,
    );
  }

  async deleteAll() {
    return this.repository.createQueryBuilder().delete().execute();
  }
}
