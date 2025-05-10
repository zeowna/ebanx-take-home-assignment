import { AbstractEntity } from '../entities/abstract-entity.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { AbstractService } from './abstract-service.service';

export abstract class AbstractEntityService<
  T extends AbstractEntity,
> extends AbstractService {
  constructor(
    protected readonly dataSource: DataSource,
    protected readonly repository: Repository<T>,
  ) {
    super(dataSource);
  }

  async create(createEntityDto: any, queryRunner?: QueryRunner): Promise<T> {
    const payload = this.repository.create(createEntityDto);

    if (queryRunner) {
      return queryRunner.manager.save(payload) as any as Promise<T>;
    }

    return this.repository.save(payload) as any as Promise<T>;
  }

  async deleteAll() {
    return this.repository.createQueryBuilder().delete().execute();
  }
}
