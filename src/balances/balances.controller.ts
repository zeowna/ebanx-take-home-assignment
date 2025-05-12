import {
  Controller,
  Get,
  Query,
  Response as ResponseParam,
} from '@nestjs/common';
import { BalancesService } from './balances.service';
import { Response } from 'express';

@Controller('balance')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  async findOne(
    @Query('account_id') accountId: string,
    @ResponseParam() response: Response,
  ) {
    const balance =
      await this.balancesService.findCurrentBalanceByAccountId(+accountId);

    if (!balance) {
      response.status(404).send('0');
      return;
    }

    response.send(`${balance?.currentBalance ?? 0}`);
  }
}
