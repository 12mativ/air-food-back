import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicForStudentService } from './competence-characteristic-for-student.service';

describe('CompetenceCharacteristicForStudentService', () => {
  let service: CompetenceCharacteristicForStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceCharacteristicForStudentService],
    }).compile();

    service = module.get<CompetenceCharacteristicForStudentService>(CompetenceCharacteristicForStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
