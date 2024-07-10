import { Test, TestingModule } from '@nestjs/testing';
import { StudentExpectingCompetenceController } from './student-expecting-competence.controller';
import { StudentExpectingCompetenceService } from './student-expecting-competence.service';

describe('StudentExpectingCompetenceController', () => {
  let controller: StudentExpectingCompetenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentExpectingCompetenceController],
      providers: [StudentExpectingCompetenceService],
    }).compile();

    controller = module.get<StudentExpectingCompetenceController>(StudentExpectingCompetenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
