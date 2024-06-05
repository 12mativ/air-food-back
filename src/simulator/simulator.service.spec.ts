import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorService } from './simulator.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SimulatorService', () => {
  let service: SimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [SimulatorService],
    }).compile();

    service = module.get<SimulatorService>(SimulatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
