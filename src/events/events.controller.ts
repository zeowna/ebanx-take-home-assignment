import {
  Body,
  Controller,
  Post,
  Response as ResponseParam,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateEventServiceFactory } from './create-event-service.factory';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventsController {
  constructor(
    private readonly createEventServiceFactory: CreateEventServiceFactory,
  ) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @ResponseParam() response: Response,
  ) {
    const service = this.createEventServiceFactory.getServiceByType(
      createEventDto.type,
    );

    const eventResponse = await service.execute(createEventDto);

    if (!eventResponse) {
      response.status(404).send('0');
      return;
    }

    response.status(201).send(eventResponse);
  }
}
