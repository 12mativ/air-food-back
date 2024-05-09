import { Injectable } from '@nestjs/common';
import { CreateCompetenceCharacteristicForStudentDto } from './dto/create-competence-characteristic-for-student.dto';
import { UpdateCompetenceCharacteristicForStudentDto } from './dto/update-competence-characteristic-for-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenceCharacteristicForStudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompetenceCharacteristicForStudentDto: CreateCompetenceCharacteristicForStudentDto) {
    const createdCompetenceCharacteristicForStudent = await this.prisma.competenceCharacteristicForStudent.create({
      data: {
        scaleValue: createCompetenceCharacteristicForStudentDto.scaleValue,
        competenceId: createCompetenceCharacteristicForStudentDto.competenceId,
        studentId: createCompetenceCharacteristicForStudentDto.studentId
      },
      include: {
        competence: true,
        student: true
      }
    })
    return createdCompetenceCharacteristicForStudent;
  }

  async findAll() {
    const competencesCharacteristicForStudent = await this.prisma.competenceCharacteristicForStudent.findMany()
    return competencesCharacteristicForStudent;
  }

  async findOne(id: string) {
    const competenceCharacteristicForStudent = await this.prisma.competenceCharacteristicForStudent.findFirst({
      where: {
        id
      }
    }) 
    return competenceCharacteristicForStudent;
  }

  update(id: string, updateCompetenceCharacteristicForStudentDto: UpdateCompetenceCharacteristicForStudentDto) {
    return `This action updates a #${id} competenceCharacteristicForStudent`;
  }

  remove(id: string) {
    return `This action removes a #${id} competenceCharacteristicForStudent`;
  }
}
