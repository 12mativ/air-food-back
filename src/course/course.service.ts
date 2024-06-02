import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/req-create-course.dto';
import { UpdateCourseDto } from './dto/req-update-course.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/role.enum';

@Injectable()
export class CourseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createCourseDto: CreateCourseDto, jwt: string) {
    const decodedJwt = this.jwtService.decode(jwt);

    const user = await this.prisma.user.findFirst({
      where: {
        email: decodedJwt.email,
      },
    });

    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto,
        startDate: null,
        endDate: null,
        creatorId: user.id,
      },
      include: {
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true,
      },
    });
    return createdCourse;
  }

  async findAll() {
    const courses = await this.prisma.course.findMany({
      include: {
        improvingCompetencies: {
          include: {
            competence: true,
          },
        },
        events: {
          include: {
            coaches: true,
            simulators: true,
          },
        },
        prerequisiteCompetencies: {
          include: {
            competence: true,
          },
        },
        students: true,
      },
    });
    return courses;
  }

  async findAllForUser(jwt: string) {
    const decodedJwt = this.jwtService.decode(jwt);

    const user = await this.prisma.user.findFirst({
      where: {
        email: decodedJwt.email,
      },
    });

    const courses = await this.prisma.course.findMany({
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
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true,
        students: user.roles.includes(Role.COURSE_ORGANISER) ? true : false,
      },
    });
    return courses;
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        id,
      },
      include: {
        improvingCompetencies: true,
        events: true,
        prerequisiteCompetencies: true,
      },
    });

    if (!course) {
      throw new BadRequestException('Курса с таким id не существует');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const { name } = updateCourseDto;
    const updateCourse = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return updateCourse;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
