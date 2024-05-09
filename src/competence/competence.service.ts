import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompetenceDto: CreateCompetenceDto) {
    const createdCompetence = await this.prisma.competence.create({
      data: {
        name: createCompetenceDto.name
      }
    });

    return createdCompetence;
  }

  async findAll() {
    const competences = await this.prisma.competence.findMany();

    return competences;
  }

  async findOne(id: string) {
    const competence = await this.prisma.competence.findFirst({
      where: {
        id
      }
    })
    return competence;
  }

  update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    return `This action updates a #${id} competence`;
  }

  remove(id: number) {
    return `This action removes a #${id} competence`;
  }
}
