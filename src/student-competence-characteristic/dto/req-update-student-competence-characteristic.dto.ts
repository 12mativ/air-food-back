import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class ReqUpdateStudentCompetenceCharacteristicDto {
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
