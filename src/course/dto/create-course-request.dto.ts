import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsDateString()
    @ApiProperty()
    startDate: string;
    
    @IsDateString()
    @ApiProperty()
    endDate: string;
}
