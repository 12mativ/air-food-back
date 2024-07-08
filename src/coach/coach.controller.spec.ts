import { Test, TestingModule } from '@nestjs/testing';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';
import { ResGetCoachesDto } from './dto/res-get-coaches.dto';
import { ResGetCoachDto } from './dto/res-get-coach.dto';
import { ReqUpdateCoachDto } from './dto/req-update-coach.dto';

describe('CoachController', () => {
  let controller: CoachController;
  let service: CoachService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CoachController],
      providers: [CoachService],
    }).compile();

    controller = module.get<CoachController>(CoachController);
    service = module.get<CoachService>(CoachService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find coaches for search', async () => {
    const coachForSearch = 'coach';
    const page = new PageRequestDto();
    page.page = 1;
    const limit = new LimitRequestDto();
    limit.limit = 10;

  const expectedResult: ResGetCoachesDto= {
    coaches: [],
    coachesTotalAmount: 0,
  };

  jest.spyOn(service, 'findCoaches').mockResolvedValue(expectedResult);

  const result = await controller.findCoachForSearch(coachForSearch, page, limit);

  expect(result).toEqual(expectedResult);
  expect(service.findCoaches).toHaveBeenCalledWith(coachForSearch, +page, +limit);
});

it('should get coach on event', async () => {
  const eventId = 'eventId1';

  const getCoachDto: ResGetCoachDto = {
    id: 'id',
    email: 'coach@example.com',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    userId: 'userId',
  };

  const expectedResult = {
    coaches: [
      {
        id: getCoachDto.id,
        email: getCoachDto.email,
        firstName: getCoachDto.firstName,
        middleName: getCoachDto.middleName,
        lastName: getCoachDto.lastName,
        userId: getCoachDto.userId,
      },
    ]
  };

  jest.spyOn(service, 'getCoachesOnEvent').mockResolvedValue(expectedResult);

  const result = await controller.getCoachesOnEvent(eventId);

  expect(result).toStrictEqual(expectedResult);
  expect(service.getCoachesOnEvent).toHaveBeenCalledWith(eventId);
});

  it('should update a coach', async () => {
    const coachId = 'coachId1';
    const updateDto: ReqUpdateCoachDto = {
      firstName: 'firstName',
      lastName: 'lastName',
      middleName: 'middleName',
    };
    const expectedResult = {
      firstName: updateDto.firstName, 
      middleName: updateDto.middleName,
      lastName: updateDto.lastName,
      email: 'coach@example.com',
      id: 'coachId1',
      userId: 'userId1',
    }

    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    const result = await controller.update(coachId, updateDto);

    expect(result).toEqual(expectedResult);
    expect(service.update).toHaveBeenCalledWith(coachId, updateDto);
  });
});
