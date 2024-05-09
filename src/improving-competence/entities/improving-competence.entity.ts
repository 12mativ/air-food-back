import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { Competence } from "src/competence/entities/competence.entity";
import { Course } from "src/course/entities/course.entity";

export class ImprovingCompetence {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsInt()
    improvingValue: number;

    @ApiProperty()
    @IsString()
    competenceId: string;

    @ApiProperty({isArray: true, type: Course})
    courses: Course[];

    @ApiProperty({type: Competence})
    competence: Competence;
}
