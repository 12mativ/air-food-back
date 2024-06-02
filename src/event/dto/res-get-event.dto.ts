import { ApiProperty } from '@nestjs/swagger';
import { Simulator } from '@prisma/client';
import { IsDateString, IsString } from 'class-validator';
import { ResGetCoachDto } from 'src/coach/dto/res-get-coach.dto';

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

  @ApiProperty({type: ResGetCoachDto, isArray: true})
  coaches: ResGetCoachDto[];

  @ApiProperty()
  simulators: Simulator[];
}
