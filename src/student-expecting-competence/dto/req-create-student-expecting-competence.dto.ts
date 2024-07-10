import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class ReqCreateStudentExpectingCompetenceDto {
  @ApiProperty()
  @IsPositive()
  @IsInt()
  scaleValue: number;

  @ApiProperty()
  @IsString()
  competenceId: string;

  @ApiProperty()
  @IsString()
  studentId: string;
}
