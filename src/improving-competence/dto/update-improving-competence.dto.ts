import { PartialType } from '@nestjs/swagger';
import { CreateImprovingCompetenceDto } from './create-improving-competence.dto';

export class UpdateImprovingCompetenceDto extends PartialType(CreateImprovingCompetenceDto) {}
