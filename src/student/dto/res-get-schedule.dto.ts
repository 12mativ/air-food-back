import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ResGetTimes {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  day: string;

  @IsNumber({},{each: true})
  @ApiProperty({isArray: true})
  time: number[];

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