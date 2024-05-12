import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetStudentsResponseDto } from './dto/get-students-response.dto';
import { UpdateStudentRequestDto } from './dto/update-student-request.dto';

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
          courses: true
        }
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
          courses: true
        }
      });
    }

    const payload = {
      students: students,
      studentsTotalAmount: studentsTotalAmount,
    };

    return payload;
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentRequestDto) {
    const { firstName, lastName, middleName, birthDate, courseId } = updateStudentDto;
    try {
      const updatedStudent = await this.prisma.student.update({
        where: {
          id,
        },
        data: {
          firstName,
          middleName,
          lastName,
          birthDate,
          courses:{
            connect: {
              id: courseId
            }
          }
        },
        include: {
          courses: true
        }
      });

      return updatedStudent;
    } catch (e) {
      throw new BadRequestException(
        'Произошла ошибка при обновлении данных обучающегося.',
      );
    }
  }
}
