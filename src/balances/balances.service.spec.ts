import { Test, TestingModule } from '@nestjs/testing';
import { BalancesService } from './balances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';

describe.only('BalancesService', () => {
  let service: BalancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Balance])],
      providers: [BalancesService],
    }).compile();

    service = module.get<BalancesService>(BalancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
