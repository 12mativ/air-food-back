import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { CompetenceModule } from './competence/competence.module';
import { CoachModule } from './coach/coach.module';
import { SimulatorModule } from './simulator/simulator.module';
import { EventModule } from './event/event.module';
import { ImprovingCompetenceModule } from './improving-competence/improving-competence.module';
import { StudentCompetenceCharacteristicModule } from './student-competence-characteristic/student-competence-characteristic.module';
import { CourseCompetenceCharacteristicModule } from './course-competence-characteristic/course-competence-characteristic.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { StudentExpectingCompetenceModule } from './student-expecting-competence/student-expecting-competence.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
    StudentModule,
    CourseModule,
    CompetenceModule,
    CoachModule,
    SimulatorModule,
    EventModule,
    ImprovingCompetenceModule,
    StudentCompetenceCharacteristicModule,
    StudentCompetenceCharacteristicModule,
    CourseCompetenceCharacteristicModule,
    CurriculumModule,
    StudentExpectingCompetenceModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
