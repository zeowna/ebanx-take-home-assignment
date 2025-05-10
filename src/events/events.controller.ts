import { Body, Controller, Post, Response } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Response as Res } from 'express';
import { CreateEventServiceFactory } from './create-event-service.factory';

@Controller('event')
export class EventsController {
  constructor(
    private readonly createEventServiceFactory: CreateEventServiceFactory,
  ) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Response() res: Res) {
    const service = this.createEventServiceFactory.getServiceByType(
      createEventDto.type,
    );

    if (!service) {
      res.status(404).send('0');
      return;
    }

    const response = await service.execute(createEventDto);

    if (!response) {
      res.status(404).send('0');
      return;
    }

    res.status(201).send(response);
  }
}
