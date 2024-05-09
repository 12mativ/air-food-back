import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCompetenceCharacteristicForCourseDto {
    @ApiProperty()
    @IsInt()
    scaleValue: number;

    @ApiProperty()
    @IsString()
    competenceId: string;
    
    @ApiProperty()
    @IsString()
    courseId: string;
}
