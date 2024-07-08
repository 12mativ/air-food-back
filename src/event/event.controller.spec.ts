import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateEventDto } from './dto/req-create-event.dto';
import { UpdateEventDto } from './dto/req-update-event.dto';
import { UpdateEventDeleteCoachDto } from './dto/req-update-event-delete-coach.dto';
import { updateEventDeleteSimulatorDto } from './dto/req-update-event-delete-simulator.dto';

describe('EventController', () => {
  let controller: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [EventController],
      providers: [EventService, JwtService],
    }).compile();

    controller = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event', async () => {
    const createDto: CreateEventDto = {
      name: 'Event1',
      startDate: '2024-07-05',
      endDate: '2024-07-06',
      courseId: 'courseId1',
    };

    const expectedResult = {
      ...createDto,
      id: 'eventId1',
    };

    jest.spyOn(eventService, 'create').mockResolvedValue(expectedResult);

    const result = await controller.create(createDto);

    expect(result).toEqual(expectedResult);
  });
  it('should find events for a course', async () => {
    const courseId = 'courseId1';
    const jwtToken = 'mockToken';

    const eventsOfCourse = [
      { id: 'eventId1', name: 'Event1', startDate: 'startDate', endDate: 'endDate', courseId: 'courseId1'},
      { id: 'eventId2', name: 'Event2', startDate: 'startDate', endDate: 'endDate', courseId: 'courseId1'},
    ];

    const expectedResult = {events:eventsOfCourse}

    jest.spyOn(eventService, 'findEvents').mockResolvedValue(expectedResult);

    const result = await controller.findEvents(courseId, jwtToken);

    expect(result).toEqual(expectedResult);
    expect(eventService.findEvents).toHaveBeenCalledWith(courseId, 'mockToken');
  });
  it('should update an event', async () => {
    const eventId = 'eventId1';
    const courseId = 'CourseId1';
    const updateDto: UpdateEventDto = {
      name: 'UpdatedEventName',
      startDate: '2024-07-07',
      endDate: '2024-07-08',
    };

    const expectedResult = {
      name: updateDto.name,
      startDate: updateDto.startDate,
      endDate: updateDto.endDate,
      id: eventId,
      courseId: courseId,
    };

    jest.spyOn(eventService, 'update').mockResolvedValue(expectedResult);

    const result = await controller.update(eventId, updateDto);

    expect(result).toEqual(expectedResult);
    expect(eventService.update).toHaveBeenCalledWith(eventId, updateDto);
  });
  it('should disconnect a coach from an event', async () => {
    const eventId = 'eventId1';
    const updateDto: UpdateEventDeleteCoachDto = {
      coachId: 'coachId1',
    };

    const expectedResult = {
      id: eventId,
      name: 'eventName',
      startDate:'startDate',
      endDate: 'endDate',
      courseId: 'courseId1',
    };

    jest.spyOn(eventService, 'disconnectCoach').mockResolvedValue(expectedResult);

    const result = await controller.disconnectCoach(eventId, updateDto);

    expect(result).toEqual(expectedResult);
    expect(eventService.disconnectCoach).toHaveBeenCalledWith(eventId, updateDto);
  });

  it('should disconnect a simulator from an event', async () => {
    const eventId = 'eventId1';
    const updateDto: updateEventDeleteSimulatorDto = {
      simulatorId: 'simulatorId1',
    };

    const expectedResult = {
      id: eventId,
      name: 'eventName',
      startDate:'startDate',
      endDate: 'endDate',
      courseId: 'courseId1',
    };

    jest.spyOn(eventService, 'disconnectSimulator').mockResolvedValue(expectedResult);

    const result = await controller.disconnectSimulator(eventId, updateDto);

    expect(result).toEqual(expectedResult);
    expect(eventService.disconnectSimulator).toHaveBeenCalledWith(eventId, updateDto);
  });
  it('should remove an event', async () => {
    const eventId = 'eventId1';

    jest.spyOn(eventService, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove(eventId);

    expect(result).toBeUndefined();
    expect(eventService.remove).toHaveBeenCalledWith(eventId);
  });
});
