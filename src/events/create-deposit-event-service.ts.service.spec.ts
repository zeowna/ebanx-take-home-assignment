import { Test, TestingModule } from '@nestjs/testing';
import { CreateDepositEventService } from './create-deposit-event.service.ts';

describe('CreateDepositEventService', () => {
  let service: CreateDepositEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDepositEventService],
    }).compile();

    service = module.get<CreateDepositEventService>(CreateDepositEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
