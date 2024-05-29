import { Test, TestingModule } from '@nestjs/testing';
import { CourseCompetenceCharacteristicController } from './course-competence-characteristic.controller';
import { CourseCompetenceCharacteristicService } from './course-competence-characteristic.service';

describe('CourseCompetenceCharacteristicController', () => {
  let controller: CourseCompetenceCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCompetenceCharacteristicController],
      providers: [CourseCompetenceCharacteristicService],
    }).compile();

    controller = module.get<CourseCompetenceCharacteristicController>(CourseCompetenceCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
