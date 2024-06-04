import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class updateEventDeleteSimulatorDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  simulatorId?: string;
}
