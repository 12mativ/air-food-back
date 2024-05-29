import { Test, TestingModule } from '@nestjs/testing';
import { CourseCompetenceCharacteristicService } from './course-competence-characteristic.service';

describe('CourseCompetenceCharacteristicService', () => {
  let service: CourseCompetenceCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCompetenceCharacteristicService],
    }).compile();

    service = module.get<CourseCompetenceCharacteristicService>(CourseCompetenceCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
