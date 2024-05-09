import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';

@Module({
  controllers: [CompetenceController],
  providers: [CompetenceService],
})
export class CompetenceModule {}
