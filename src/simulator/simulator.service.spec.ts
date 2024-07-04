import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorService } from './simulator.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
const prismaMock = {
  simulator: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
  },
  course: {
    findFirst: jest.fn(),
  },
  event: {
    findMany: jest.fn(),
  },
};

describe('SimulatorService', () => {
  let service: SimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      providers: [
        SimulatorService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<SimulatorService>(SimulatorService);
    jest.clearAllMocks();
  });

  it('should create a simulator', async () => {
    const dto = { name: 'Test Simulator', courseId: 'course1' };
    prismaMock.course.findFirst.mockResolvedValue({ id: 'course1' });
    prismaMock.simulator.create.mockResolvedValue({ id: 'sim1', ...dto });

    const result = await service.create(dto);

    expect(result).toEqual({ id: 'sim1', ...dto });
    expect(prismaMock.course.findFirst).toHaveBeenCalledWith({ where: { id: 'course1' } });
    expect(prismaMock.simulator.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Simulator',
        courseId: 'course1',
      },
    });
  });

  it('should return simulators for a course', async () => {
    const courseId = 'course1';
    const simulators = [{ id: 'sim1', name: 'Simulator 1' }];
    prismaMock.simulator.findMany.mockResolvedValue(simulators);

    const result = await service.findSimulatorsOnCourse(courseId);

    expect(result).toEqual(simulators);
    expect(prismaMock.simulator.findMany).toHaveBeenCalledWith({
      where: {
        events: {
          every: {
            courseId,
          },
        },
      },
    });
  });

  it('should return simulators for an event', async () => {
    const eventId = 'event1';
    const simulators = [{ id: 'sim1' }];
    prismaMock.event.findMany.mockResolvedValue([{ simulators }]);

    const result = await service.findSimulatorsOnEvent(eventId);

    expect(result).toEqual([{ simulators }]);
    expect(prismaMock.event.findMany).toHaveBeenCalledWith({
      where: {
        id: eventId,
      },
      select: {
        simulators: true,
      },
    });
  });

  it('should update a simulator', async () => {
    const id = 'sim1';
    const dto = { name: 'Updated Simulator' };
    const updatedSimulator = { id, ...dto };
    prismaMock.simulator.update.mockResolvedValue(updatedSimulator);

    const result = await service.update(id, dto);

    expect(result).toEqual(updatedSimulator);
    expect(prismaMock.simulator.update).toHaveBeenCalledWith({
      where: { id },
      data: { name: 'Updated Simulator' },
    });
  });

  it('should remove a simulator', async () => {
    const id = 'sim1';
    prismaMock.simulator.findFirst.mockResolvedValue({ id });
    prismaMock.simulator.delete.mockResolvedValue({ id });

    await service.remove(id);

    expect(prismaMock.simulator.findFirst).toHaveBeenCalledWith({ where: { id } });
    expect(prismaMock.simulator.delete).toHaveBeenCalledWith({ where: { id } });
  });
});