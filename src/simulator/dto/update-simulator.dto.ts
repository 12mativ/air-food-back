import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSimulatorDto {
  @IsString()
  @ApiProperty()
  name: string;
}
