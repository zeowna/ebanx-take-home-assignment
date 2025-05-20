import { IsNumber } from 'class-validator';
import { AbstractCreateEventDto } from './abstract-create-event.dto';

export class CreateWithdrawEventDto extends AbstractCreateEventDto {
  @IsNumber()
  origin: number;
}
