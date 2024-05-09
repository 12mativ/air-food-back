import { Injectable } from '@nestjs/common';
import { CreateCompetenceCharacteristicForCourseDto } from './dto/create-competence-characteristic-for-course.dto';
import { UpdateCompetenceCharacteristicForCourseDto } from './dto/update-competence-characteristic-for-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenceCharacteristicForCourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompetenceCharacteristicForCourseDto: CreateCompetenceCharacteristicForCourseDto) {
    const createdCompetenceCharacteristicForCourse = await this.prisma.competenceCharacteristicForCourse.create({
      data: {
        scaleValue: createCompetenceCharacteristicForCourseDto.scaleValue,
        competenceId: createCompetenceCharacteristicForCourseDto.competenceId,
        courseId: createCompetenceCharacteristicForCourseDto.courseId
      },
      include: {
        competence: true,
        course: true
      }
    });

    return createdCompetenceCharacteristicForCourse;
  }

  async findAll() {
    const competenceCharacteristicForCourse = await this.prisma.competenceCharacteristicForCourse.findMany();
    return competenceCharacteristicForCourse;
  }

  async findOne(id: string) {
    const competenceCharacteristicForCourse = await this.prisma.competenceCharacteristicForCourse.findFirst({
      where: {
        id
      }
    })
    return competenceCharacteristicForCourse;
  }

  update(id: string, updateCompetenceCharacteristicForCourseDto: UpdateCompetenceCharacteristicForCourseDto) {
    return `This action updates a #${id} competenceCharacteristicForCourse`;
  }

  remove(id: string) {
    return `This action removes a #${id} competenceCharacteristicForCourse`;
  }
}
