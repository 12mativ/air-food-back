import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Days, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { UpdateStudentRequestDto } from './dto/req-update-student.dto';
const prismaMock = {
  student: {
    count: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  course: {
    findFirst: jest.fn(),
  },
  times: {
    deleteMany: jest.fn(),
    createMany: jest.fn(),
  },
};
describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [StudentService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },],
    }).compile();

    service = module.get<StudentService>(StudentService);
    jest.clearAllMocks();
  });

  it('should return students for a course', async () => {
    const courseId = 'courseId1';
    const students = { students: [{ id: 'Student1', email: 'stud@example.com' }] };
    prismaMock.course.findFirst.mockResolvedValue(students);

    const result = await service.getStudentsOnCourse(courseId);

    expect(result).toEqual(students);
    expect(prismaMock.course.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaMock.course.findFirst).toHaveBeenCalledWith({
      where: { id: courseId },
      select: {
        students: {
          include: {
            schedule: { include: { times: true } },
          },
        },
      },
    });
  });
  it('should update students', async () => {
    const id = '1';
    const dto: UpdateStudentRequestDto = {
      firstName: 'Updated',
      lastName: 'Student',
      middleName: 'Middle',
      birthDate: '2000.11.02', 
      times: [{ day: Days.monday, time: Prisma.Decimal[10] }], // Использование enum для day
    };
    const updatedStudent = {
      id: '1',
      scheduleId: 'schedule1',
      ...dto,
    };
    prismaMock.student.findFirst.mockResolvedValue({updatedStudent});

    prismaMock.student.update.mockResolvedValue({updatedStudent});

    const result = await service.updateStudent(id, dto);

    expect(result).toEqual({updatedStudent});
    expect(prismaMock.student.findFirst).toHaveBeenCalledTimes(2);
    expect(prismaMock.student.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.times.deleteMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.times.createMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.student.findFirst).toHaveBeenCalledWith({
      where: { id },
    });
    expect(prismaMock.student.update).toHaveBeenCalledWith({
      where: { id },
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        birthDate: dto.birthDate,
      },
      include: {
        courses: true,
        schedule: {
          include: { times: true },
        },
      },
    });
  });
});
