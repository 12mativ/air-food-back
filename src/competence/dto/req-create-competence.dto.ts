import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqCreateCompetenceDto {
  @IsString()
  @ApiProperty()
  name: string;
}
