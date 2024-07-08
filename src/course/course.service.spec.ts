import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const prismaMock = {
  student: {
    findFirst: jest.fn(),
  },
  user: {
    findFirst: jest.fn(),
  },
  course: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
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
    prismaMock.course.update.mockClear();
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
      id: courseId,
      name: 'course1',
      startDate: "string",
      endDate: "string",
      creatorId: "1",
      prerequisiteCompetencies: [],
      improvingCompetencies: []
    };
    prismaMock.student.findFirst.mockResolvedValue(true);
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

  it('should update course without studentId', async () => {
    const courseId = 'courseId1';
    const updateCourseDto = { name: 'course1', studentId: '' };
    const updatedCourse = {
        id: courseId,
        name: 'course1',
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
        where: { id: courseId },
        data: {
            name: updateCourseDto.name,
            students: {},
        },
        include: {
            improvingCompetencies: {
                include: { competence: true },
            },
            prerequisiteCompetencies: {
                include: { competence: true },
            },
        },
    });
});

  it('should remove student from course and update course',async () => {
    const courseId = 'courseId1';
    const updateCourseDeleteStudentDto = {studentId: 'studentId1'};
    const currentCourse = { id: courseId, students: [{ id: 'student1' }] };
    const updatedCourse = {
      id: courseId,
      name: 'course1',
      startDate: "string",
      endDate: "string",
      creatorId: "1",
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
    prismaMock.course.findFirst
    .mockResolvedValueOnce(currentCourse) // Для проверки существования курса
    .mockResolvedValueOnce(currentCourse); // Для проверки существования студента на курсе
    const result = await service.disconnectStudent(courseId, updateCourseDeleteStudentDto);

    expect(result).toEqual(updatedCourse);
    expect(prismaMock.course.findFirst).toHaveBeenCalledTimes(2);
    expect(prismaMock.course.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.update).toHaveBeenCalledWith({
      where: { id: courseId },
      data: {
        students: { disconnect: { id: updateCourseDeleteStudentDto.studentId } },
      },
      include: {
        improvingCompetencies: { include: { competence: true } },
        prerequisiteCompetencies: { include: { competence: true } },
      },
    });
  });

  it('should remove course', async () => {
    const courseId = 'courseId1';

    prismaMock.course.findUnique.mockResolvedValue({ id: courseId });
    prismaMock.course.delete.mockResolvedValue({ id: courseId });

    await service.remove(courseId);

    expect(prismaMock.course.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.findUnique).toHaveBeenCalledWith({ where: { id: courseId } });
    expect(prismaMock.course.delete).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.delete).toHaveBeenCalledWith({ where: { id: courseId } });
  });
}); 
