import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ReqCreateEventDto } from './req-create-event.dto';

export class UpdateEventDto extends PartialType(ReqCreateEventDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  coachId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  simulatorId?: string;
}
