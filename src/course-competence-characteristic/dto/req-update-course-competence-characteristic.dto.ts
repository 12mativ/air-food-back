import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ReqUpdateCourseCompetenceCharacteristicDto {
  @ApiProperty()
  @IsPositive()
  @IsInt()
  @IsOptional()
  scaleValue?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  competenceId?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  courseId?: string;
}
