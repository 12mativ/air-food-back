import { Test, TestingModule } from '@nestjs/testing';
import { StudentExpectingCompetenceService } from './student-expecting-competence.service';

describe('StudentExpectingCompetenceService', () => {
  let service: StudentExpectingCompetenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentExpectingCompetenceService],
    }).compile();

    service = module.get<StudentExpectingCompetenceService>(StudentExpectingCompetenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
