import { Test, TestingModule } from '@nestjs/testing';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('CoachController', () => {
  let controller: CoachController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CoachController],
      providers: [CoachService],
    }).compile();

    controller = module.get<CoachController>(CoachController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
