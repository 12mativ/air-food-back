import { Module } from '@nestjs/common';
import { CompetenceCharacteristicForCourseService } from './competence-characteristic-for-course.service';
import { CompetenceCharacteristicForCourseController } from './competence-characteristic-for-course.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompetenceCharacteristicForCourseController],
  providers: [CompetenceCharacteristicForCourseService],
})
export class CompetenceCharacteristicForCourseModule {}
