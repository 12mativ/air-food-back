import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PrismaModule } from './prisma/prisma.module';
import { AirplaneModule } from './airplane/airplane.module';

@Module({
  imports: [FlightModule, PrismaModule, AirplaneModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
