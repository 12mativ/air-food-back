import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirplaneModule } from './airplane/airplane.module';
import { AuthModule } from './auth/auth.module';
import { FlightModule } from './flight/flight.module';
import { PrismaModule } from './prisma/prisma.module';
import { PilotModule } from './pilot/pilot.module';

@Module({
  imports: [
    FlightModule,
    PrismaModule,
    AirplaneModule,
    AuthModule,
    ConfigModule.forRoot(),
    PilotModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
