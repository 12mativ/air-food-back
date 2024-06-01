import { Injectable } from '@nestjs/common';
import { ReqCreateImprovingCompetenceDto } from './dto/req-create-improving-competence.dto';
import { ReqUpdateImprovingCompetenceDto } from './dto/req-update-improving-competence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImprovingCompetenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createImprovingCompetenceDto: ReqCreateImprovingCompetenceDto) {
    const {improvingValue, competenceId, courseId} = createImprovingCompetenceDto;
    const createdImprovingCompetence =
      await this.prisma.improvingCompetence.create({
        data: {
          improvingValue,
          competenceId,
          courseId
        },
        include: {
          competence: true
        }
      });
    return createdImprovingCompetence;
  }

  async update(
    id: string,
    updateImprovingCompetenceDto: ReqUpdateImprovingCompetenceDto,
  ) {
    const {improvingValue, competenceId} = updateImprovingCompetenceDto;
    const updatedImprovingCompetence = await this.prisma.improvingCompetence.update({
      where: {
        id
      }, 
      data: {
        improvingValue,
        competenceId
      }
    })

    return updatedImprovingCompetence;
  }

  async remove(id: string) {
    await this.prisma.improvingCompetence.delete({
      where: {
        id
      }
    })
  }
}
