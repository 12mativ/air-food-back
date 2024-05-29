import { Injectable } from '@nestjs/common';
import { ReqCreateCourseCompetenceCharacteristicDto } from './dto/req-create-course-competence-characteristic.dto';
import { ReqUpdateCourseCompetenceCharacteristicDto } from './dto/req-update-course-competence-characteristic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseCompetenceCharacteristicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCourseCompetenceCharacteristicDto: ReqCreateCourseCompetenceCharacteristicDto,
  ) {
    const { scaleValue, competenceId, courseId } =
      createCourseCompetenceCharacteristicDto;
    const courseCreatedCompetenceCharacteristic =
      await this.prisma.courseCompetenceCharacteristic.create({
        data: {
          scaleValue,
          competenceId,
          courseId,
        },
        include: {
          competence: true,
        },
      });

    return courseCreatedCompetenceCharacteristic;
  }

  async update(
    id: string,
    updateCourseCompetenceCharacteristicDto: ReqUpdateCourseCompetenceCharacteristicDto,
  ) {
    const {scaleValue, competenceId} = updateCourseCompetenceCharacteristicDto;

    const updatedCourseCompetenceCharacteristic = await this.prisma.courseCompetenceCharacteristic.update({
      where: {
        id
      },
      data: {
        scaleValue,
        competenceId
      }
    })

    return updatedCourseCompetenceCharacteristic;
  }

  async remove(id: string) {
    await this.prisma.courseCompetenceCharacteristic.delete({
      where: {
        id
      }
    })
  }
}
