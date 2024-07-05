import { Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurriculumService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCurriculumDto: CreateCurriculumDto) {
    const expectedCompetenciesIds = createCurriculumDto.expectedCompetencies.map(ec => ec.competenceId)
    let firstStageCoursesCandidates = []
    // поиск всех курсов которые прокачивают нужные нам компетнеции
    const courses = await this.prisma.course.findMany({
      where: {
        improvingCompetencies: {
          some: {
            competenceId: {in: expectedCompetenciesIds}
          }
        }
      },
      include: {
        improvingCompetencies: true
      }
    })

    // поиск курсов которые достаточно прокачивают нужные нам компетенции
    courses.forEach(c => {
      c.improvingCompetencies.forEach(ic => {
        if (expectedCompetenciesIds.includes(ic.competenceId)) {
          const currentCompetency = createCurriculumDto.currentCompetencies.find(cc => cc.competenceId === ic.competenceId)
          const expectedCompetency = createCurriculumDto.expectedCompetencies.find(ec => ec.competenceId === ic.competenceId)
          if (ic.improvingValue + currentCompetency.scaleValue >= expectedCompetency.scaleValue) {
            firstStageCoursesCandidates.push(c)
          }
        }
      })
    })

    console.log('==================f', firstStageCoursesCandidates, "=======================")
  }

  findOne(id: number) {
    return `This action returns a #${id} curriculum`;
  }

  update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    return `This action updates a #${id} curriculum`;
  }

  remove(id: number) {
    return `This action removes a #${id} curriculum`;
  }
}
