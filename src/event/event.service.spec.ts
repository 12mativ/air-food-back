import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

const prismaMock ={
  course: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  event: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findFirst: jest.fn(),
  },
  coach: {
    findFirst: jest.fn(),
  },
  simulator: {
    findFirst: jest.fn(),
  },
};

const jwtMock = {
  decode: jest.fn(),
};


describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      providers: [EventService,
        {
          provide: PrismaService,
          useValue:prismaMock,
        },
        { 
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);

    prismaMock.course.findFirst.mockClear();
    prismaMock.course.update.mockClear();
    prismaMock.event.create.mockClear();
    prismaMock.event.findFirst.mockClear();
    prismaMock.event.update.mockClear();
    prismaMock.event.delete.mockClear();
  });

  it('should create event and return it', async () => {
    const course = {
      id: 'courseId1',
      name: 'course1',
      startDate: 'date',
      endDate: 'date',
      creatorId: 'creatorId',
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
    const createdEvent={
      name: 'event',
      startDate: 'string',
      endDate: 'string',
      courseId: 'courseId1',
    };
    prismaMock.course.findFirst.mockResolvedValue(course);
    prismaMock.course.update.mockResolvedValue(course);
    prismaMock.event.create.mockResolvedValue(createdEvent)

    const objForCreatingEvent = {
      name: 'event',
      startDate: 'string',
      endDate: 'string',
      courseId: 'courseId1',
    };
    const result = await service.create(objForCreatingEvent)

    expect(result).toEqual(createdEvent)
    expect(prismaMock.event.create).toHaveBeenCalledTimes(1);
    expect (prismaMock.event.create).toHaveBeenCalledWith({
      data: {
        name: objForCreatingEvent.name,
        startDate: objForCreatingEvent.startDate,
        endDate: objForCreatingEvent.endDate,
        courseId: course.id,
      },
    })
  });
  it('should return events for a coach', async () => {
    const user = { 
      id: 'userId', 
      email: 'coach@example.com', 
      password: 'griffith',
      roles: ['COACH'] };
    const courseWithEvents = {
      id: 'courseId',
      events: [
        { id: 'event1', name: 'Event 1', coaches: [{ id: 'userId' }] },
        { id: 'event2', name: 'Event 2', coaches: [{ id: 'otherCoachId' }] },
      ],
    };

    jwtMock.decode.mockReturnValue(user.email);
    prismaMock.user.findFirst.mockResolvedValue(user);
    prismaMock.course.findFirst.mockResolvedValue(courseWithEvents);

    const result = await service.findEvents(courseWithEvents.id, user.email);
    
    expect(result).toEqual(courseWithEvents);
    expect(prismaMock.course.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'courseId',
      },
      select: {
        events: {
          where: {
            coaches: {
              some: {
                id: 'userId',
              },
            },
          },
        },
      },
    });
  });

  it('should update event', async () => {
    const currentEvent = {
      id: 'eventId',
      name: 'event1',
      startDate: 'date',
      endDate: 'date',
    };
    const updatedEvent = {
      ...currentEvent,
      name: 'updatedEvent1',
    };

    prismaMock.event.findFirst.mockResolvedValue(currentEvent);
    prismaMock.event.update.mockResolvedValue(updatedEvent);
    prismaMock.coach.findFirst.mockResolvedValue({ id: 'coachId' });
    prismaMock.simulator.findFirst.mockResolvedValue({ id: 'simulatorId' });
    const updateEventDto = {
      name: 'updatedEvent1',
      startDate: 'date',
      endDate: 'date',
      coachId: 'coachId',
      simulatorId: 'simulatorId',
    };
    const result = await service.update('eventId', updateEventDto);

    expect(result).toEqual(updatedEvent);
    expect(prismaMock.event.update).toHaveBeenCalledWith({
      where: { id: 'eventId' },
      data: {
        name: updateEventDto.name,
        startDate: updateEventDto.startDate,
        endDate: updateEventDto.endDate,
        coaches: { connect: { id: updateEventDto.coachId } },
        simulators: { connect: { id: updateEventDto.simulatorId } },
      },
    });
  });
  it('should disconnect coach from event', async () => {
    const currentEvent = {
      id: 'eventId',
      coaches: [{ id: 'coachId' }],
    };

    prismaMock.event.findFirst.mockResolvedValue(currentEvent);
    prismaMock.event.update.mockResolvedValue(currentEvent);

    const updateEventDeleteCoachDto = {
      coachId: 'coachId',
    };

    const result = await service.disconnectCoach('eventId', updateEventDeleteCoachDto);

    expect(result).toEqual(currentEvent);
    expect(prismaMock.event.update).toHaveBeenCalledWith({
      where: { id: 'eventId' },
      data: {
        coaches: { disconnect: { id: updateEventDeleteCoachDto.coachId } },
      },
    });
  });

  it('should disconnect simulator from event', async () => {
    const currentEvent = {
      id: 'eventId',
      simulators: [{ id: 'simulatorId' }],
    };

    prismaMock.event.findFirst.mockResolvedValue(currentEvent);
    prismaMock.event.update.mockResolvedValue(currentEvent);

    const updateEventDeleteSimulatorDto = {
      simulatorId: 'simulatorId',
    };

    const result = await service.disconnectSimulator('eventId', updateEventDeleteSimulatorDto);

    expect(result).toEqual(currentEvent);
    expect(prismaMock.event.update).toHaveBeenCalledWith({
      where: { id: 'eventId' },
      data: {
        simulators: { disconnect: { id: updateEventDeleteSimulatorDto.simulatorId } },
      },
    });
  });
  it('should disconnect simulator from event', async () => {
    const currentEvent = {
      id: 'eventId',
      simulators: [{ id: 'simulatorId' }],
    };

    prismaMock.event.findFirst.mockResolvedValue(currentEvent);
    prismaMock.event.update.mockResolvedValue(currentEvent);

    const updateEventDeleteSimulatorDto = {
      simulatorId: 'simulatorId',
    };

    const result = await service.disconnectSimulator('eventId', updateEventDeleteSimulatorDto);

    expect(result).toEqual(currentEvent);
    expect(prismaMock.event.update).toHaveBeenCalledWith({
      where: { id: 'eventId' },
      data: {
        simulators: { disconnect: { id: updateEventDeleteSimulatorDto.simulatorId } },
      },
    });
  });

  it('should remove event', async () => {
    const eventId = 'eventId1';

    prismaMock.event.findFirst.mockResolvedValue({ id: eventId });
    prismaMock.event.delete.mockResolvedValue({ id: eventId });

    await service.remove(eventId);

    expect(prismaMock.event.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.event.delete).toHaveBeenCalledTimes(1);
    expect(prismaMock.event.delete).toHaveBeenCalledWith({ where: { id: eventId } });
  });
});
