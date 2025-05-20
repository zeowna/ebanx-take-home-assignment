import { AbstractCreateEventDto } from './abstract-create-event.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto extends AbstractCreateEventDto {
  @IsOptional()
  @IsNumber()
  origin?: number;

  @IsOptional()
  @IsNumber()
  destination?: number;
}
