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
import { CompetenceCharacteristicModule } from './competence-characteristic/competence-characteristic.module';
import { ImprovingCompetenceModule } from './improving-competence/improving-competence.module';

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
    CompetenceCharacteristicModule,
    ImprovingCompetenceModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
