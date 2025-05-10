import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransferEventService } from './create-transfer-event.service';

describe('CreateTransferEventService', () => {
  let service: CreateTransferEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTransferEventService],
    }).compile();

    service = module.get<CreateTransferEventService>(
      CreateTransferEventService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
