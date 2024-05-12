import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    startDate: string;
    
    @IsOptional()
    @IsDateString()
    @ApiProperty()
    endDate: string;
}
