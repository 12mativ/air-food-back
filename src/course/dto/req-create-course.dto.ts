import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @MinLength(1, {message: "Имя курса должно содержать хотя бы один символ"})
    @ApiProperty()
    name: string;
}
