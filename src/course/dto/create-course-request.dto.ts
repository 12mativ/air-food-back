import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @ApiProperty()
    name: string;
}
