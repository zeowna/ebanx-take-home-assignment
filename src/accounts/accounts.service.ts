import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { DataSource, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractEntityService } from 'src/common/services/abstract-entity-service.service';

@Injectable()
export class AccountsService extends AbstractEntityService<Account> {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    @InjectRepository(Account)
    protected readonly repository: Repository<Account>,
  ) {
    super(dataSource, repository);
  }

  async create(createAccountDto: CreateAccountDto) {
    const payload = this.repository.create(createAccountDto);
    const created = await this.repository.save(payload);

    // Forces the id param
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ id: createAccountDto.id })
      .where({ id: created.id })
      .execute();

    created.id = createAccountDto.id;

    return created;
  }

  async deleteAll() {
    return this.repository.createQueryBuilder().delete().execute();
  }
}
