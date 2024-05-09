import { Module } from '@nestjs/common';
import { CompetenceCharacteristicForStudentService } from './competence-characteristic-for-student.service';
import { CompetenceCharacteristicForStudentController } from './competence-characteristic-for-student.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompetenceCharacteristicForStudentController],
  providers: [CompetenceCharacteristicForStudentService],
})
export class CompetenceCharacteristicForStudentModule {}
