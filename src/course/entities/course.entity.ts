import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class Course {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsDateString()
    @ApiProperty()
    startDate: string;
    
    @IsDateString()
    @ApiProperty()
    endDate: string;
    
    prerequisiteCompetencies: any
    competencies: any
    events: any
}