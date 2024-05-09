import { Module } from '@nestjs/common';
import { ImprovingCompetenceService } from './improving-competence.service';
import { ImprovingCompetenceController } from './improving-competence.controller';

@Module({
  controllers: [ImprovingCompetenceController],
  providers: [ImprovingCompetenceService],
})
export class ImprovingCompetenceModule {}
