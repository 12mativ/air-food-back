import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CreateCourseDto } from './dto/req-create-course.dto';
import { UpdateCourseDto } from './dto/req-update-course.dto';
import { UpdateCourseDeleteStudentDto } from './dto/update-course-delete-student.dto';
import { ResGetCourseDto } from './dto/res-get-course.dto';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();
    
    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new course', async () => {
    const createDto: CreateCourseDto = {
      name: 'New Course',
    };
  
    const expectedResult = {
      id: 'courseId1',
      name: 'New Course',
      startDate: null,
      endDate: null,
      creatorId: 'userId1',
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
  
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
  
    const result = await controller.create('Bearer token', createDto,);
  
    expect(result).toEqual(expectedResult);
    expect(service.create).toHaveBeenCalledWith(createDto, 'token');
  });

  it('should find all courses for admin', async () => {
    const expectedResult = [
      { id: 'courseId1', 
        name: 'Course 1', 
        startDate: 'startDate', 
        endDate: 'endDate', 
        creatorId: 'creatorId1', 
        prerequisiteCompetencies: [{
          id: 'compId1',
          scaleValue: 3,
          competenceId: 'competenceId1',
          courseId:'courseId1',
          studentId: 'studentId1',
          competence: {
            id: 'competenceId1',
            name: 'Competence 1',
          },
        },], 
        improvingCompetencies: [
          {
            id: 'improvId1',
            improvingValue: 5,
            competenceId: 'competenceId3',
            courseId: 'courseId1',
            competence: {
              id: 'competenceId3',
              name: 'Competence 3',
            },
          },
        ] 
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    const result = await controller.findAll();

    expect(result).toEqual(expectedResult);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find all courses for user', async () => {
    const jwtToken = 'Bearer jwt-token';
    const expectedResult = [
      { id: 'courseId1', 
        name: 'Course 1', 
        startDate: 'startDate', 
        endDate: 'endDate', 
        creatorId: 'creatorId1', 
        prerequisiteCompetencies: [{
          id: 'compId1',
          scaleValue: 3,
          competenceId: 'competenceId1',
          courseId:'courseId1',
          studentId: 'studentId1',
          competence: {
            id: 'competenceId1',
            name: 'Competence 1',
          },
        },], 
        improvingCompetencies: [
          {
            id: 'improvId1',
            improvingValue: 5,
            competenceId: 'competenceId3',
            courseId: 'courseId1',
            competence: {
              id: 'competenceId3',
              name: 'Competence 3',
            },
          },
        ] 
      },
    ];
    
    jest.spyOn(service, 'findAllForUser').mockResolvedValue(expectedResult);

    const result = await controller.findAllForUser(jwtToken);

    expect(result).toEqual(expectedResult);
    expect(service.findAllForUser).toHaveBeenCalledWith('jwt-token');
  });

  it('should update an existing course', async () => {
    const courseId = 'courseId1';
    const updateDto: UpdateCourseDto = {
      name: 'Updated Course Name',
    };
  
    const expectedResult = {
      id: courseId,
      name: 'Updated Course Name',
      startDate: null,
      endDate: null,
      creatorId: 'userId1',
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
  
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
  
    const result = await controller.update(courseId, updateDto);
  
    expect(result).toEqual(expectedResult);
    expect(service.update).toHaveBeenCalledWith(courseId, updateDto);
  });
  it('should disconnect a student from a course', async () => {
    const courseId = 'courseId1';
    const updateDto: UpdateCourseDeleteStudentDto = {
      studentId: 'studentId1',
    };
  
    const expectedResult = {
      id: courseId,
      name: 'Course Name',
      startDate: null,
      endDate: null,
      creatorId: 'userId1',
      prerequisiteCompetencies: [],
      improvingCompetencies: [],
    };
  
    jest.spyOn(service, 'disconnectStudent').mockResolvedValue(expectedResult);
  
    const result = await controller.disconnectStudent(courseId, updateDto);
  
    expect(result).toEqual(expectedResult);
    expect(service.disconnectStudent).toHaveBeenCalledWith(courseId, updateDto);
  });
  it('should remove a course', async () => {
    const courseId = 'courseId1';
  
    jest.spyOn(service, 'remove').mockResolvedValue();
  
    const result = await controller.remove(courseId);
  
    expect(result).toBeUndefined()
    expect(service.remove).toHaveBeenCalledWith(courseId);
  });
});
