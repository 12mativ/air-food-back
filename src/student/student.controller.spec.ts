import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GetStudentsResponseDto } from './dto/res-get-students.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';
import { scheduled } from 'rxjs';
import { Days } from '@prisma/client';
import { UpdateStudentRequestDto } from './dto/req-update-student.dto';
import { ResGetStudentDto } from './dto/res-get-student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [StudentController],
      providers: [StudentService,JwtService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('should find students for search', async () => {
      const studentForSearch = 'student';
      const page = new PageRequestDto();
      page.page = 1;
      const limit = new LimitRequestDto();
      limit.limit = 10;

    const expectedResult: GetStudentsResponseDto = {
      students: [],
      studentsTotalAmount: 0,
    };

    jest.spyOn(service, 'findStudents').mockResolvedValue(expectedResult);

    const result = await controller.findStudentForSearch(studentForSearch, page, limit);

    expect(result).toEqual(expectedResult);
    expect(service.findStudents).toHaveBeenCalledWith(studentForSearch, +page, +limit);
  });

  it('should get students on course', async () => {
    const courseId = 'courseId1';

    const expectedResult = {
      students: [
        {
          id: 'studentId1',
          email: 'student1@example.com',
          firstName: 'John',
          middleName: 'Middle',
          lastName: 'Travis',
          birthDate: '2000.01.01',
          userId: 'userId1',
          scheduleId: 'scheduleId1',
          schedule: {
            id: 'scheduleId',
            times: [
              {
                id:'idTime',
                day: Days.friday,
                time: [],  
                scheduleId: 'scheduleIdTime1'
              }
            ]
          },
        }
      ]
    };
    jest.spyOn(service, 'getStudentsOnCourse').mockResolvedValue(expectedResult);

    const result = await controller.getStudentsOnCourse(courseId);

    expect(result).toEqual(expectedResult);
    expect(service.getStudentsOnCourse).toHaveBeenCalledWith(courseId);
  });
  it('should update a student', async () => {
    const studentId = 'studentId1';
    const updateDto: UpdateStudentRequestDto = {
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      middleName: 'UpdatedMiddleName',
      birthDate: '2000-01-01',
      times: [],
    };

    const getStudentResult: ResGetStudentDto = {
      id: studentId,
      email: 'student1@example.com',
      firstName: updateDto.firstName,
      middleName: updateDto.middleName,
      lastName: updateDto.lastName,
      birthDate: updateDto.birthDate,
      userId: 'userId1',
      schedule: {
        id: 'scheduleId',
        userId: 'userId',
        times: [
          {
            id:'idTime',
            day: Days.monday,
            time: [],  
            scheduleId: 'scheduleIdTime1'
          }
        ]
      },
      competences: [],
      courses: [],
    };

    const expectedResult = {
      id: studentId,
      email: 'student1@example.com',
      firstName: updateDto.firstName,
      middleName: updateDto.middleName,
      lastName: updateDto.lastName,
      birthDate: updateDto.birthDate,
      userId: 'userId1',
      schedule: {
      times: [
        {
            id: "idTime",
            day: Days.monday, 
            time: [], 
            scheduleId: "scheduleIdTime1"
        }
    ],
    id: "someId"
  },
  courses: [
    {
      id: "courseId",
      name: "Course1",
      startDate: "2024.01.01",
      endDate: "2024.06.30",
      creatorId: "creatorId"
    }
  ],
  scheduleId: 'scheduleId'
  };

    jest.spyOn(service, 'updateStudent').mockResolvedValue(expectedResult);

    const result = await controller.updateStudent(studentId, updateDto);

    expect(result).toEqual(expectedResult);
    expect(service.updateStudent).toHaveBeenCalledWith(studentId, updateDto);
  });
});
