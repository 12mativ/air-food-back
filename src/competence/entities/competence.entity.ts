import { ApiProperty } from "@nestjs/swagger";
import { CourseCompetenceCharacteristic, StudentCompetenceCharacteristic } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";
import { ImprovingCompetence } from "src/improving-competence/entities/improving-competence.entity";

export class Competence {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    improvingCompetence?: ImprovingCompetence;

    @ApiProperty()
    @IsOptional()
    competenceCharacteristicForStudent?: StudentCompetenceCharacteristic;

    @ApiProperty()
    @IsOptional()
    competenceCharacteristicForCourse?: CourseCompetenceCharacteristic;
}
