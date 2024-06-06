import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const prismaMock = {
  user: {
    findFirst: jest.fn(),
  },
  course: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

const jwtMock = {
  decode: jest.fn(),
};

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);

    prismaMock.user.findFirst.mockClear();
    prismaMock.course.create.mockClear();
    prismaMock.course.findMany.mockClear();
  });

  it('should create course and return it', async () => {
    const user = {
      id: '1',
      email: 'robert_polson@mail.ru',
      password: 'griffith',
      roles: ['ADMIN'],
    };

    const createdCourse = {
      id: "string",
      name: "course1",
      startDate: "string",
      endDate: "string",
      creatorId: user.id,
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
    prismaMock.course.create.mockResolvedValue(createdCourse);
    prismaMock.user.findFirst.mockResolvedValue(user);
    jwtMock.decode.mockResolvedValue(user);

    const objForCreatingCourse = {
      name: 'course1',
    };

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

  it('should return courses', async () => {
    const courses = [
      {
        id: "string",
        name: "course1",
        startDate: "string",
        endDate: "string",
        creatorId: '1',
        prerequisiteCompetencies: [],
        improvingCompetencies: [],
      },
      {
        id: "string",
        name: "course2",
        startDate: "string",
        endDate: "string",
        creatorId: '2',
        prerequisiteCompetencies: [],
        improvingCompetencies: [],
      },
    ];

    prismaMock.course.findMany.mockResolvedValue(courses);

    const result = await service.findAll();

    expect(result).toEqual(courses);
    expect(prismaMock.course.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.findMany).toHaveBeenCalledWith({
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

  it('should return all courses for user', async () => {
    const user = {
      id: '1',
      email: 'robert_polson@mail.ru',
      password: 'griffith',
      roles: ['ADMIN'],
    };
    const courses = [
      {
        id: "course1",
        name: "course1",
        startDate: "string",
        endDate: "string",
        creatorId: user.id,
        prerequisiteCompetencies: [],
        improvingCompetencies: [],
      }
    ]
    prismaMock.user.findFirst.mockResolvedValue(user);
    prismaMock.course.findMany.mockResolvedValue(courses);
    jwtMock.decode.mockResolvedValue(user);

    const result = await service.findAllForUser('sfa');
    expect(result).toEqual(courses);
    expect(prismaMock.course.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            creatorId: user.id,
          },
          {
            students: {
              some: {
                userId: user.id,
              },
            },
          },
        ],
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
    })
  });

  it('should update course', async () => {
    const courseId = 'courseId1';
    const updateCourseDto = { name: 'course1', studentId: 'student1' };
    const updatedCourse = {
      id: "string",
      name: courseId,
      startDate: "string",
      endDate: "string",
      creatorId: "1",
      prerequisiteCompetencies: [],
      improvingCompetencies: []
    };
    prismaMock.course.update.mockResolvedValue(updatedCourse);
    const result = await service.update(courseId, updateCourseDto);

    expect(result).toEqual(updatedCourse);
    expect(prismaMock.course.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.update).toHaveBeenCalledWith({
      where: {
        id: courseId,
      },
      data: {
        name:updateCourseDto.name,
        students:{ connect: { id: updateCourseDto.studentId } },
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
