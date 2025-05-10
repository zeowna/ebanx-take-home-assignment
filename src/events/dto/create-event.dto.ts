import { EventTypesEnum } from '../entities/event-types.enum';

export class CreateEventDto {
  type: EventTypesEnum;

  origin?: number;

  destination?: number;

  amount: number;
}
