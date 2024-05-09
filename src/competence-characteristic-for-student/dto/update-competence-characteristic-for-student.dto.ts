import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceCharacteristicForStudentDto } from './create-competence-characteristic-for-student.dto';

export class UpdateCompetenceCharacteristicForStudentDto extends PartialType(CreateCompetenceCharacteristicForStudentDto) {}
