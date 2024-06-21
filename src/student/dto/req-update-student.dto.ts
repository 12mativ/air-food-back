import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ReqUpdateTimesDto } from './req-update-times.dto';
import { Type } from 'class-transformer';

export class UpdateStudentRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ type: ReqUpdateTimesDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => ReqUpdateTimesDto)
  @IsOptional()
  times?: ReqUpdateTimesDto[];
}
