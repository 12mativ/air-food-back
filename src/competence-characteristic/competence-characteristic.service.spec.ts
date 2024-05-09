import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicService } from './competence-characteristic.service';

describe('CompetenceCharacteristicService', () => {
  let service: CompetenceCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceCharacteristicService],
    }).compile();

    service = module.get<CompetenceCharacteristicService>(CompetenceCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
