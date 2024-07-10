import { BadRequestException, Injectable } from '@nestjs/common';
import { ReqCreateStudentExpectingCompetenceDto } from './dto/req-create-student-expecting-competence.dto';
import { ReqUpdateStudentExpectingCompetenceDto } from './dto/req-update-student-expecting-competence.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentExpectingCompetenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentExpectingCompetenceDto: ReqCreateStudentExpectingCompetenceDto) {
    const { scaleValue, competenceId, studentId } =
    createStudentExpectingCompetenceDto;
    const isCompetenceExist =
      await this.prisma.studentExpectingCompetence.findFirst({
        where: {
          competenceId,
          studentId,
        },
      });

    if (isCompetenceExist) {
      throw new BadRequestException('Эта компетенция уже существует');
    }

    const createdStudentExpectingCompetence =
      await this.prisma.studentExpectingCompetence.create({
        data: {
          scaleValue,
          competenceId,
          studentId,
        },
        include: {
          competence: true,
        },
      });
    return createdStudentExpectingCompetence;
  }

  async update(id: string, updateStudentExpectingCompetenceDto: ReqUpdateStudentExpectingCompetenceDto) {
    const { competenceId, scaleValue } = updateStudentExpectingCompetenceDto;

    const updatedStudentCompetenceCharacteristic =
      await this.prisma.studentExpectingCompetence.update({
        where: {
          id,
        },
        data: {
          scaleValue: scaleValue,
          competenceId: competenceId,
        },
      });

    return updatedStudentCompetenceCharacteristic;
  }

  async remove(id: string) {
    await this.prisma.studentCompetenceCharacteristic.delete({
      where: {
        id,
      },
    });
  }
}
