import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course-request.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto
      },
      include: {
        competencies: true,
        events: true,
        prerequisiteCompetencies: true
      }
    })
    return createdCourse;
  }

  async findAll(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      include: {
        competencies: true,
        events: true,
        prerequisiteCompetencies: true
      }
    })
    return courses;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.prisma.course.findFirst({
      where: {
        id
      },
      include: {
        competencies: true,
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
