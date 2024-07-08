import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@prisma/client';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';

enum DaysEnum {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday"
}

export class ReqUpdateTime {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(23.99)
  startTime: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(23.99)
  endTime: number;
}

export class ReqUpdateTimesDto {
  @ApiProperty()
  @IsEnum(DaysEnum, {message: "Доступные значения дней недели: monday, tuesday, wednesday, thursday, friday, saturday, sunday"})
  day: Days;

  @ApiProperty({type: ReqUpdateTime, isArray: true})
  time: ReqUpdateTime[];
}
