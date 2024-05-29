import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompetenceCharacteristicService } from './student-competence-characteristic.service';

describe('StudentCompetenceCharacteristicService', () => {
  let service: StudentCompetenceCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCompetenceCharacteristicService],
    }).compile();

    service = module.get<StudentCompetenceCharacteristicService>(StudentCompetenceCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
