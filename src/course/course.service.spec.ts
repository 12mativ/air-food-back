import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'


const jwtMock = {
  decode: jest.fn()
};

describe('CourseService', () => {
  let service: CourseService;
  let prismaMock: DeepMockProxy<PrismaClient>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService, 
        {
          provide: PrismaService, 
          useValue: mockDeep<PrismaClient>(),
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        }
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);

  });

  it('should create course and return it', async () => {
    const user = {
      id: '1',
      email: 'robert_polson@mail.ru',
      password: 'griffith',
      roles: ['ADMIN']
    }

    const createdCourse = {
      id: "string",
      name: "course1",
      startDate: "string",
      endDate: "string",
      creatorId: user.id,
      prerequisiteCompetencies: [],
      improvingCompetencies: []
    }
    prismaMock.course.create.mockResolvedValue(createdCourse);
    prismaMock.user.findFirst.mockResolvedValue(user);
    jwtMock.decode.mockResolvedValue(user);

    const objForCreatingCourse ={
      name: 'course1'
    }

    const result = await service.create(objForCreatingCourse, 'sfa');


    expect(result).toEqual(createdCourse);
    expect(prismaMock.course.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.create).toHaveBeenCalledWith({
      data: {
        name: objForCreatingCourse.name,
        startDate: null,
        endDate: null,
        creatorId: user.id,
      },
      include: {
        improvingCompetencies: {
          include: {
            competence: true,
          },
        },
        prerequisiteCompetencies: {
          include: {
            competence: true,
          },
        },
      },
    });
  });
});
