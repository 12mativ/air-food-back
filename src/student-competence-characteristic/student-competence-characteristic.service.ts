import { BadRequestException, Injectable } from '@nestjs/common';
import { ReqCreateStudentCompetenceCharacteristicDto } from './dto/req-create-student-competence-characteristic.dto';
import { ReqUpdateStudentCompetenceCharacteristicDto } from './dto/req-update-student-competence-characteristic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentCompetenceCharacteristicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createStudentCompetenceCharacteristicDto: ReqCreateStudentCompetenceCharacteristicDto,
  ) {
    const { scaleValue, competenceId, studentId } =
      createStudentCompetenceCharacteristicDto;
    const isCompetenceExist =
      await this.prisma.studentCompetenceCharacteristic.findFirst({
        where: {
          competenceId,
          studentId,
        },
      });

    if (isCompetenceExist) {
      throw new BadRequestException('Эта компетенция уже существует');
    }

    const createdStudentCompetenceCharacteristic =
      await this.prisma.studentCompetenceCharacteristic.create({
        data: {
          scaleValue,
          competenceId,
          studentId,
        },
        include: {
          competence: true,
        },
      });
    return createdStudentCompetenceCharacteristic;
  }

  async update(
    id: string,
    updateStudentCompetenceCharacteristicDto: ReqUpdateStudentCompetenceCharacteristicDto,
  ) {
    const { competenceId, scaleValue } =
      updateStudentCompetenceCharacteristicDto;

    const updatedStudentCompetenceCharacteristic =
      await this.prisma.studentCompetenceCharacteristic.update({
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
