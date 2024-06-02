import { ApiProperty } from '@nestjs/swagger';
import { Coach, Course, Simulator } from '@prisma/client';
import { IsDateString, IsString } from 'class-validator';

export class ResGetEventDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsString()
  courseId: string;

  @ApiProperty()
  coaches: Coach[];

  @ApiProperty()
  simulators: Simulator[];
}
