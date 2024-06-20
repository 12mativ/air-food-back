import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Days, Prisma } from '@prisma/client'

export class ReqUpdateTimesDto {
  @ApiProperty()
  @IsEnum(Days)
  day: Days;

  @ApiProperty()
  @IsString()
  time: Prisma.Decimal[];
}
