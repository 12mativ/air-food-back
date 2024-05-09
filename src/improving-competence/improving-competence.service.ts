import { Injectable } from '@nestjs/common';
import { CreateImprovingCompetenceDto } from './dto/create-improving-competence.dto';
import { UpdateImprovingCompetenceDto } from './dto/update-improving-competence.dto';

@Injectable()
export class ImprovingCompetenceService {
  create(createImprovingCompetenceDto: CreateImprovingCompetenceDto) {
    return 'This action adds a new improvingCompetence';
  }

  findAll() {
    return `This action returns all improvingCompetence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} improvingCompetence`;
  }

  update(id: number, updateImprovingCompetenceDto: UpdateImprovingCompetenceDto) {
    return `This action updates a #${id} improvingCompetence`;
  }

  remove(id: number) {
    return `This action removes a #${id} improvingCompetence`;
  }
}
