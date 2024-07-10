import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsObject, IsPositive, IsString } from 'class-validator';
import { ResGetCompetenceDto } from '../../competence/dto/res-get-competence.dto';

export class ResGetStudentExpectingCompetenceDto {
  @ApiProperty()
  @IsString()
  id: string;
  
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

  @ApiProperty()
  @IsObject()
  @Type(() => ResGetCompetenceDto)
  competence: ResGetCompetenceDto;
}
