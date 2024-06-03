import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/req-create-course.dto';
import { UpdateCourseDto } from './dto/req-update-course.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/role.enum';
import { UpdateCourseDeleteStudentDto } from './dto/update-course-delete-student.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async create(createCourseDto: CreateCourseDto, jwt: string) {

    const decodedJwt = this.jwtService.decode(jwt);
    
    const user = await this.prisma.user.findFirst({
      where: {
        email: decodedJwt.email
      }
    })
    
    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto,
        startDate: null,
        endDate: null,
        creatorId: user.id
      },
      include: {
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true
      }
    })
    return createdCourse;
  }
 
  async findAll() {
    const courses = await this.prisma.course.findMany({
      include: {
        improvingCompetencies: {
          include: {
            competence: true
          }
        },
        events: {
          include: {
            coaches: true,
            simulators: true
          }
        },
        prerequisiteCompetencies: {
          include: {
            competence: true
          }
        },
        students: true
      }
    })
    return courses;
  }

  async findAllForUser(jwt: string) {
    const decodedJwt = this.jwtService.decode(jwt);
    
    const user = await this.prisma.user.findFirst({
      where: {
        email: decodedJwt.email
      }
    })


    const courses = await this.prisma.course.findMany({
      where:{
        OR: [
          {
            creatorId: user.id
          },
          {
            students: {
              some: {
                userId: user.id
              }
            }
          }
        ]
      },
      include: {
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true,
        students: user.roles.includes(Role.COURSE_ORGANISER) ? true : false
      }
    })
    return courses;
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        id
      },
      include: {
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true
      }
    })

    if (!course) {
      throw new BadRequestException("Курса с таким id не существует")
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const { name, studentId } = updateCourseDto;
    const students = studentId ? {connect: {id: studentId}} : {}

    const updateCourse = await this.prisma.course.update({
      where: {
        id,
      },
      data:{
        name,
        students,
      },
      include: {
        students: true,
        events: true,
        improvingCompetencies: {
          include: {
            competence: true
          }
        },
        prerequisiteCompetencies: {
          include: {
            competence: true
          }
        }
      }
    })
    return updateCourse;
  }

  async disconnectStudent(id: string, updateCourseDeleteStudentDto: UpdateCourseDeleteStudentDto) {
    const currentCourse = await this.prisma.course.findFirst({
      where: {
        id,
      },
    })
    if (!currentCourse){
      throw new BadRequestException("Курса с таким id не существует")
    }

    const currentStudentOnCourse = await this.prisma.course.findFirst({
      where: {
        id,
        students: {
          some: {
            id: updateCourseDeleteStudentDto.studentId,
          },
        },
      },
    })
    if (!currentStudentOnCourse){
      throw new BadRequestException("Студента с таким id на курсе не существует")
    }

    const updateCourse = await this.prisma.course.update({
      where: {
        id: id,
      },
      data:{
        students: {
          disconnect: {
            id: updateCourseDeleteStudentDto.studentId,
          },
        },
      },
      include: {
        students: true,
        events: true,
        improvingCompetencies: true,
        prerequisiteCompetencies: true
      }
    })
    return updateCourse;
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new BadRequestException('Курс с таким id не существует');
    }

    await this.prisma.course.delete({
      where: { id },
    });
  }
}