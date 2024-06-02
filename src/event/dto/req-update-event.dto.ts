import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateEventDto } from './req-create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
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
