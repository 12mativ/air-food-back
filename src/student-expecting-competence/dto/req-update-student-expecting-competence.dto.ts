import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class ReqUpdateStudentExpectingCompetenceDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  scaleValue?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  competenceId?: string;
}
