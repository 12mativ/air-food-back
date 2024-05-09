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
import { CompetenceCharacteristicForStudentModule } from './competence-characteristic-for-student/competence-characteristic-for-student.module';
import { CompetenceCharacteristicForCourseModule } from './competence-characteristic-for-course/competence-characteristic-for-course.module';

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
    CompetenceCharacteristicForStudentModule,
    CompetenceCharacteristicForCourseModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
