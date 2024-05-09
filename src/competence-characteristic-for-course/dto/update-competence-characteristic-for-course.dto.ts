import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceCharacteristicForCourseDto } from './create-competence-characteristic-for-course.dto';

export class UpdateCompetenceCharacteristicForCourseDto extends PartialType(CreateCompetenceCharacteristicForCourseDto) {}
