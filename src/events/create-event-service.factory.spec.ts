import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventServiceFactory } from './create-event-service.factory';

describe('CreateEventServiceFactory', () => {
  let service: CreateEventServiceFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateEventServiceFactory],
    }).compile();

    service = module.get<CreateEventServiceFactory>(CreateEventServiceFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
