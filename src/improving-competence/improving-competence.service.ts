import { Injectable } from '@nestjs/common';
import { CreateImprovingCompetenceDto } from './dto/create-improving-competence.dto';
import { UpdateImprovingCompetenceDto } from './dto/update-improving-competence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImprovingCompetenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createImprovingCompetenceDto: CreateImprovingCompetenceDto) {
    const createdImprovingCompetence = await this.prisma.improvingCompetence.create({
      data: {
        improvingValue: createImprovingCompetenceDto.improvingValue,
        competenceId: createImprovingCompetenceDto.competenceId
      }
    })
    return createdImprovingCompetence;
  }

  async findAll() {
    const improvingCompetences = await this.prisma.improvingCompetence.findMany();
    return improvingCompetences;
  }

  async findOne(id: string) {
    const imporovingCompetence = await this.prisma.improvingCompetence.findFirst({
      where: {
        id
      }
    }) 
    return imporovingCompetence;
  }

  update(id: string, updateImprovingCompetenceDto: UpdateImprovingCompetenceDto) {
    return `This action updates a #${id} improvingCompetence`;
  }

  remove(id: string) {
    return `This action removes a #${id} improvingCompetence`;
  }
}
