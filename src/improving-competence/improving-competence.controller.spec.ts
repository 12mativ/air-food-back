import { Test, TestingModule } from '@nestjs/testing';
import { ImprovingCompetenceController } from './improving-competence.controller';
import { ImprovingCompetenceService } from './improving-competence.service';

describe('ImprovingCompetenceController', () => {
  let controller: ImprovingCompetenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImprovingCompetenceController],
      providers: [ImprovingCompetenceService],
    }).compile();

    controller = module.get<ImprovingCompetenceController>(ImprovingCompetenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
