import { Test, TestingModule } from '@nestjs/testing';
import { ImprovingCompetenceService } from './improving-competence.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ImprovingCompetenceService', () => {
  let service: ImprovingCompetenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ImprovingCompetenceService],
    }).compile();

    service = module.get<ImprovingCompetenceService>(ImprovingCompetenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
