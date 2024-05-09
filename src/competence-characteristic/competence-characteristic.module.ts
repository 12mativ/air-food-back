import { Module } from '@nestjs/common';
import { CompetenceCharacteristicService } from './competence-characteristic.service';
import { CompetenceCharacteristicController } from './competence-characteristic.controller';

@Module({
  controllers: [CompetenceCharacteristicController],
  providers: [CompetenceCharacteristicService],
})
export class CompetenceCharacteristicModule {}
