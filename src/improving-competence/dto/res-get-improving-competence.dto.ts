import { ApiProperty } from '@nestjs/swagger';
import { Competence } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsObject, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ResGetCompetenceDto } from 'src/competence/dto/res-get-competence.dto';

export class ResGetImprovingCompetenceDto {
  @ApiProperty()
  @IsString()
  id: string
  
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

  @ApiProperty()
  @IsObject()
  @Type(() => ResGetCompetenceDto)
  competence: ResGetCompetenceDto
}
