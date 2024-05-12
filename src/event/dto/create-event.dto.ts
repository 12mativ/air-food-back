import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";
import { Course } from "src/course/entities/course.entity";

export class CreateEventDto {
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
}
