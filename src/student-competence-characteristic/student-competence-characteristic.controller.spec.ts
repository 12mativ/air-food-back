import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompetenceCharacteristicController } from './student-competence-characteristic.controller';
import { StudentCompetenceCharacteristicService } from './student-competence-characteristic.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('StudentCompetenceCharacteristicController', () => {
  let controller: StudentCompetenceCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [StudentCompetenceCharacteristicController],
      providers: [StudentCompetenceCharacteristicService],
    }).compile();

    controller = module.get<StudentCompetenceCharacteristicController>(StudentCompetenceCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
