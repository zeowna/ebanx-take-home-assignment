import { EventTypesEnum } from '../entities/event-types.enum';
import { IsEnum, IsNumber } from 'class-validator';

export abstract class AbstractCreateEventDto {
  @IsEnum(EventTypesEnum)
  type: EventTypesEnum;

  @IsNumber()
  amount: number;
}
