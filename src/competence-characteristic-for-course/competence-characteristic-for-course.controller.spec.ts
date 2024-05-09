import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicForCourseController } from './competence-characteristic-for-course.controller';
import { CompetenceCharacteristicForCourseService } from './competence-characteristic-for-course.service';

describe('CompetenceCharacteristicForCourseController', () => {
  let controller: CompetenceCharacteristicForCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenceCharacteristicForCourseController],
      providers: [CompetenceCharacteristicForCourseService],
    }).compile();

    controller = module.get<CompetenceCharacteristicForCourseController>(CompetenceCharacteristicForCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
