import { DataSource } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventResponseDTO } from './dto/event-response.dto';
import { EventsService } from './events.service';
import { AbstractService } from 'src/common/services/abstract-service.service';

export abstract class AbstractCreateEventService extends AbstractService {
  constructor(
    protected readonly dataSource: DataSource,
    protected readonly eventsService: EventsService,
  ) {
    super(dataSource);
  }

  abstract execute(
    createEventDto: CreateEventDto,
  ): Promise<EventResponseDTO | null>;
}
