import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCompetenceCharacteristicForStudentDto {
    @ApiProperty()
    @IsInt()
    scaleValue: number;

    @ApiProperty()
    @IsString()
    competenceId: string;
    
    @ApiProperty()
    @IsString()
    studentId: string;
}
