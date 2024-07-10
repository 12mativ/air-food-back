import { Module } from '@nestjs/common';
import { StudentExpectingCompetenceService } from './student-expecting-competence.service';
import { StudentExpectingCompetenceController } from './student-expecting-competence.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentExpectingCompetenceController],
  providers: [StudentExpectingCompetenceService],
})
export class StudentExpectingCompetenceModule {}
