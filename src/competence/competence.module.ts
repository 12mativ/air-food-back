import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompetenceController],
  providers: [CompetenceService],
})
export class CompetenceModule {}
