import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PilotModule } from './pilot/pilot.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
    PilotModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
