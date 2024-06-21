import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Days, Prisma } from '@prisma/client'

enum DaysEnum {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday"
}

export class ReqUpdateTimesDto {
  @ApiProperty()
  @IsEnum(DaysEnum, {message: "Доступные значения дней недели: monday, tuesday, wednesday, thursday, friday, saturday, sunday"})
  day: Days;

  @ApiProperty()
  @Min(0, {each: true})
  @Max(23, {each: true})
  @IsNumber({}, {each: true})
  time: Prisma.Decimal[];
}
