import { Test, TestingModule } from '@nestjs/testing';
import { ImprovingCompetenceController } from './improving-competence.controller';
import { ImprovingCompetenceService } from './improving-competence.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ImprovingCompetenceController', () => {
  let controller: ImprovingCompetenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ImprovingCompetenceController],
      providers: [ImprovingCompetenceService],
    }).compile();

    controller = module.get<ImprovingCompetenceController>(ImprovingCompetenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
