import { Module } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { PilotController } from './pilot.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PilotController],
  providers: [PilotService],
})
export class PilotModule {}
