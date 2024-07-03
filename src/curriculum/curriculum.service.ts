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
    const courses = await this.prisma.course.findMany({
      where: {
        improvingCompetencies: {
          some: {
            AND: [
              {
                competenceId: {in: expectedCompetenciesIds}
              },
              {
                improvingValue: {
                  //todo чтоб еще значение увеличивающее было таким чтоб сложить его с текущим и оно получилось не меньше нужного scaleValue...
                  //gte:
                }
              }
            ]
          }
        }
      }
    })
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
