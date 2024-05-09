import { Test, TestingModule } from '@nestjs/testing';
import { ImprovingCompetenceService } from './improving-competence.service';

describe('ImprovingCompetenceService', () => {
  let service: ImprovingCompetenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImprovingCompetenceService],
    }).compile();

    service = module.get<ImprovingCompetenceService>(ImprovingCompetenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
