import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ResGetTime {
  @IsString()
  @ApiProperty()
  id: string;

  @IsNumber()
  @ApiProperty()
  startTime: number;

  @IsNumber()
  @ApiProperty()
  endTime: number;
}

export class ResGetTimes {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  day: string;

  @ApiProperty({type: ResGetTime, isArray: true})
  time: ResGetTime[];

  @IsString()
  @ApiProperty()
  scheduleId: string;
}

export class ResGetSchedule {
  @IsString()
  @ApiProperty()
  id: string;

  @ApiProperty({type: ResGetTimes, isArray: true})
  times: ResGetTimes[]; 

  @IsString()
  @ApiProperty()
  userId: string
}