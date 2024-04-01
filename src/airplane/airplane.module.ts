import { Module } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { AirplaneController } from './airplane.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AirplaneController],
  providers: [AirplaneService],
})
export class AirplaneModule {}
