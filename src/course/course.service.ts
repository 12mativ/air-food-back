import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course-request.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto
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
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true
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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
