import { Test, TestingModule } from '@nestjs/testing';
import { CreateWithdrawEventServiceService } from './create-withdraw-event.service';

describe('CreateWithdrawEventServiceService', () => {
  let service: CreateWithdrawEventServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateWithdrawEventServiceService],
    }).compile();

    service = module.get<CreateWithdrawEventServiceService>(
      CreateWithdrawEventServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
