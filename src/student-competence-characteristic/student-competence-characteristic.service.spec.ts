import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompetenceCharacteristicService } from './student-competence-characteristic.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('StudentCompetenceCharacteristicService', () => {
  let service: StudentCompetenceCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [StudentCompetenceCharacteristicService],
    }).compile();

    service = module.get<StudentCompetenceCharacteristicService>(StudentCompetenceCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
