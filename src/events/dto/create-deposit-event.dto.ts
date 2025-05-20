import { IsNumber } from 'class-validator';
import { AbstractCreateEventDto } from './abstract-create-event.dto';

export class CreateDepositEventDto extends AbstractCreateEventDto {
  @IsNumber()
  destination: number;
}
