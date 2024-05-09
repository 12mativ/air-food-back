import { Injectable } from '@nestjs/common';
import { CreateCompetenceCharacteristicDto } from './dto/create-competence-characteristic.dto';
import { UpdateCompetenceCharacteristicDto } from './dto/update-competence-characteristic.dto';

@Injectable()
export class CompetenceCharacteristicService {
  create(createCompetenceCharacteristicDto: CreateCompetenceCharacteristicDto) {
    return 'This action adds a new competenceCharacteristic';
  }

  findAll() {
    return `This action returns all competenceCharacteristic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competenceCharacteristic`;
  }

  update(id: number, updateCompetenceCharacteristicDto: UpdateCompetenceCharacteristicDto) {
    return `This action updates a #${id} competenceCharacteristic`;
  }

  remove(id: number) {
    return `This action removes a #${id} competenceCharacteristic`;
  }
}
