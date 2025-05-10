import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { Balance } from './entities/balance.entity';
import { AbstractEntityService } from 'src/common/services/abstract-entity-service.service';

@Injectable()
export class BalancesService extends AbstractEntityService<Balance> {
  constructor(
    @InjectDataSource()
    protected readonly dataSource: DataSource,
    @InjectRepository(Balance)
    protected readonly repository: Repository<Balance>,
  ) {
    super(dataSource, repository);
  }

  async findCurrentBalanceByAccountId(accountId: number) {
    const balance = await this.repository.findOne({
      where: { account: { id: accountId } },
      order: { createdAt: -1 },
    });

    return balance;
  }

  async create(createBalanceDto: CreateBalanceDto, queryRunner?: QueryRunner) {
    return super.create(createBalanceDto, queryRunner);
  }

  async sumBalance(
    accountId: number,
    amount: number,
    queryRunner?: QueryRunner,
  ) {
    const balance = await this.findCurrentBalanceByAccountId(accountId);

    if (!balance) {
      return null;
    }

    const currentBalance = balance.currentBalance + amount;

    return this.create(
      new CreateBalanceDto({
        accountId: balance.account!.id,
        currentBalance,
      }),
      queryRunner,
    );
  }

  async subtractBalance(
    accountId: number,
    amount: number,
    queryRunner?: QueryRunner,
  ) {
    const balance = await this.findCurrentBalanceByAccountId(accountId);

    if (!balance) {
      return null;
    }

    const currentBalance = balance.currentBalance - amount;
    return this.create(
      new CreateBalanceDto({
        accountId,
        currentBalance,
      }),
      queryRunner,
    );
  }
}
