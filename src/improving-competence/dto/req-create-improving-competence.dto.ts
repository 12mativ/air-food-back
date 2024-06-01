import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class ReqCreateImprovingCompetenceDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  improvingValue: number;

  @ApiProperty()
  @IsString()
  competenceId: string;

  @ApiProperty()
  @IsString()
  courseId: string;
}
