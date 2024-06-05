import { Module } from '@nestjs/common';
import { ImprovingCompetenceService } from './improving-competence.service';
import { ImprovingCompetenceController } from './improving-competence.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImprovingCompetenceController],
  providers: [ImprovingCompetenceService],
})
export class ImprovingCompetenceModule {}
