import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirplaneModule } from './airplane/airplane.module';
import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';
import { FlightModule } from './flight/flight.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    FlightModule,
    PrismaModule,
    AirplaneModule,
    AuthModule,
    CatModule,
    ConfigModule.forRoot(),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
