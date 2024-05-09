import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicForCourseService } from './competence-characteristic-for-course.service';

describe('CompetenceCharacteristicForCourseService', () => {
  let service: CompetenceCharacteristicForCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceCharacteristicForCourseService],
    }).compile();

    service = module.get<CompetenceCharacteristicForCourseService>(CompetenceCharacteristicForCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
