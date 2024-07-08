import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, MinLength } from "class-validator";

export class CreateEventDto {
  @ApiProperty()
  @MinLength(1, {message: "Имя мероприятия должно содержать хотя бы один символ"})
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
