import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompetenceDto } from './dto/create-competence-request.dto';

@Injectable()
export class CompetenceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompetenceDto: CreateCompetenceDto) {
    const createdCompetence = await this.prisma.competence.create({
      data: {
        name: createCompetenceDto.name,
      },
    });

    return createdCompetence;
  }

  async findAll() {
    const competences = await this.prisma.competence.findMany();

    return competences;
  }

  async remove(id: string) {
    await this.prisma.competence.delete({
      where: {
        id,
      },
    });
  }
}
