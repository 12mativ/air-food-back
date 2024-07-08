import { Test, TestingModule } from '@nestjs/testing';
import { CoachService } from './coach.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ReqUpdateCoachDto } from './dto/req-update-coach.dto';

const prismaMock={
  event:{
    findFirst: jest.fn(),
  },
  coach:{
    count:jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  simulator:{
    findFirst: jest.fn(),
  }
}

describe('CoachService', () => {
  let service: CoachService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CoachService,
        {
          provide: PrismaService,
          useValue:prismaMock,
        },
      ],
    }).compile();

    service = module.get<CoachService>(CoachService);
    jest.clearAllMocks();
  });
  it('should return coaches for a specific event', async () => {
    const eventId = 'eventId';
    const coaches = [{id:'id', email:'coach@example.mail', firstName: 'firstName', middleName: 'middleName', lastName: 'lastName', userId: 'userId'}];

    prismaMock.event.findFirst.mockResolvedValue(coaches);

    const result = await service.getCoachesOnEvent(eventId);

    expect(result).toEqual(coaches);
    expect(prismaMock.event.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.event.findFirst).toHaveBeenCalledWith({
      where: {
        id: eventId
      },
      select: {
        coaches: true
      }
    });
  });
  it('should update a coach', async () => {
    const id= 'coachId';
    const updateCoachDto: ReqUpdateCoachDto = { firstName: 'New', lastName: 'Name', middleName: 'Middle', simulatorId: 'simulatorId' };
    const updatedCoach = { id, ...updateCoachDto, email: 'coach@example.com', userId: 'userId'};
    const currentSimulator = { id: 'simulatorId' };

    prismaMock.simulator.findFirst.mockResolvedValue(currentSimulator);
    prismaMock.coach.update.mockResolvedValue(updatedCoach);

    const result = await service.update(id, updateCoachDto);

    expect(result).toEqual(updatedCoach);
    expect(prismaMock.simulator.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.simulator.findFirst).toHaveBeenCalledWith({
      where: { id: updateCoachDto.simulatorId },
    });
    expect(prismaMock.coach.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.coach.update).toHaveBeenCalledWith({
      where: { id },
      data: {
        firstName: updateCoachDto.firstName,
        lastName: updateCoachDto.lastName,
        middleName: updateCoachDto.middleName,
        simulators: { connect: { id: updateCoachDto.simulatorId } },
      },
    });
  });
});
