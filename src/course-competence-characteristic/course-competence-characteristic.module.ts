import { Module } from '@nestjs/common';
import { CourseCompetenceCharacteristicService } from './course-competence-characteristic.service';
import { CourseCompetenceCharacteristicController } from './course-competence-characteristic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseCompetenceCharacteristicController],
  providers: [CourseCompetenceCharacteristicService],
})
export class CourseCompetenceCharacteristicModule {}
