import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private readonly repository: Repository<Account>,
  ) {}

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
