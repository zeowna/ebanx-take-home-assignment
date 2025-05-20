import { IsNumber } from 'class-validator';
import { AbstractCreateEventDto } from './abstract-create-event.dto';

export class CreateTransferEventDto extends AbstractCreateEventDto {
  @IsNumber()
  origin: number;

  @IsNumber()
  destination: number;
}
