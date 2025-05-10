import { DataSource } from 'typeorm';

export abstract class AbstractService {
  constructor(protected readonly dataSource: DataSource) {}

  protected async createQueryRunner() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    const queryRunner = this.dataSource.createQueryRunner();

    return queryRunner;
  }
}
