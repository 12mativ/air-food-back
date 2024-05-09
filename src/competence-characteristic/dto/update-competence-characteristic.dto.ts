import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceCharacteristicDto } from './create-competence-characteristic.dto';

export class UpdateCompetenceCharacteristicDto extends PartialType(CreateCompetenceCharacteristicDto) {}
