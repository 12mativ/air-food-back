import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SimulatorController', () => {
  let controller: SimulatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [SimulatorController],
      providers: [SimulatorService],
    }).compile();

    controller = module.get<SimulatorController>(SimulatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
