import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicForStudentController } from './competence-characteristic-for-student.controller';
import { CompetenceCharacteristicForStudentService } from './competence-characteristic-for-student.service';

describe('CompetenceCharacteristicForStudentController', () => {
  let controller: CompetenceCharacteristicForStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenceCharacteristicForStudentController],
      providers: [CompetenceCharacteristicForStudentService],
    }).compile();

    controller = module.get<CompetenceCharacteristicForStudentController>(CompetenceCharacteristicForStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
