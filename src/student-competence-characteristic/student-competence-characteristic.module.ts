import { Module } from '@nestjs/common';
import { StudentCompetenceCharacteristicService } from './student-competence-characteristic.service';
import { StudentCompetenceCharacteristicController } from './student-competence-characteristic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentCompetenceCharacteristicController],
  providers: [StudentCompetenceCharacteristicService],
})
export class StudentCompetenceCharacteristicModule {}
