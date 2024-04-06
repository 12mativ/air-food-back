import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PrismaModule } from './prisma/prisma.module';
import { AirplaneModule } from './airplane/airplane.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FlightModule,
    PrismaModule,
    AirplaneModule,
    AuthModule,
    UsersModule,
    CatModule,
    ConfigModule.forRoot(),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
