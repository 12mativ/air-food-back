import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UpdateStudentRequestDto } from './dto/req-update-student.dto';
import { GetStudentsResponseDto } from './dto/res-get-students.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async findStudents(
    studentForSearch: string,
    page: number,
    limit: number,
  ): Promise<GetStudentsResponseDto> {
    let studentsTotalAmount;
    let students;

    page = page ? page : 1;
    limit = limit ? limit : 10;

    if (studentForSearch) {
      studentsTotalAmount = await this.prisma.student.count({
        where: {
          OR: [
            {
              email: {
                contains: studentForSearch,
              },
            },
            {
              firstName: {
                contains: studentForSearch,
              },
            },
            {
              lastName: {
                contains: studentForSearch,
              },
            },
          ],
        },
      });

      students = await this.prisma.student.findMany({
        where: {
          OR: [
            {
              email: {
                contains: studentForSearch,
              },
            },
            {
              firstName: {
                contains: studentForSearch,
              },
            },
            {
              lastName: {
                contains: studentForSearch,
              },
            },
          ],
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
        include: {
          courses: true,
          competences: {
            include: {
              competence: true,
            },
          },
          schedule: {
            include: {
              times: true,
            },
          },
        },
      });
    } else {
      studentsTotalAmount = await this.prisma.student.count();
      students = await this.prisma.student.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
        include: {
          courses: true,
          competences: {
            include: {
              competence: true,
            },
          },
          schedule: {
            include: {
              times: true,
            },
          },
        },
      });
    }

    const payload = {
      students: students,
      studentsTotalAmount: studentsTotalAmount,
    };

    return payload;
  }

  async getStudentsOnCourse(courseId: string) {
    const students = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
      select: {
        students: {
          include: {
            schedule: {
              include: {
                times: true,
              },
            },
          },
        },
      },
    });

    return students;
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentRequestDto) {
    const { firstName, lastName, middleName, birthDate, times } =
      updateStudentDto;

    if (new Date(birthDate) > new Date()) {
      throw new BadRequestException('Дата рождения больше текущей даты');
    }

    const currentStudent = await this.prisma.student.findFirst({
      where: {
        id,
      },
    });

    if (!currentStudent) {
      throw new BadRequestException('Студента с таким id не существует');
    }

    const updatedStudent = await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        firstName,
        middleName,
        lastName,
        birthDate,
      },
      include: {
        courses: true,
        schedule: {
          include: {
            times: true,
          },
        },
      },
    });

    if (times) {
      await this.prisma.times.deleteMany({
        where: {
          scheduleId: updatedStudent.scheduleId,
        },
      });

      // Создание новых записей times и связанных time объектов
      for (const t of times) {
        const newTimes = await this.prisma.times.create({
          data: {
            day: t.day,
            scheduleId: updatedStudent.schedule.id,
          },
        });

        await this.prisma.time.createMany({
          data: t.time.map((time) => ({
            startTime: time.startTime,
            endTime: time.endTime,
            timesId: newTimes.id,
          })),
        });
      }

      return await this.prisma.student.findFirst({
        where: {
          id,
        },
        include: {
          courses: true,
          schedule: {
            include: {
              times: {
                include: {
                  time: true
                }
              },
            },
          },
        },
      });
    }

    return updatedStudent;
  }
}
