import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceCharacteristicController } from './competence-characteristic.controller';
import { CompetenceCharacteristicService } from './competence-characteristic.service';

describe('CompetenceCharacteristicController', () => {
  let controller: CompetenceCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenceCharacteristicController],
      providers: [CompetenceCharacteristicService],
    }).compile();

    controller = module.get<CompetenceCharacteristicController>(CompetenceCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
