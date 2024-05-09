import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CompetenceCharacteristic } from "src/competence-characteristic/entities/competence-characteristic.entity";
import { ImprovingCompetence } from "src/improving-competence/entities/improving-competence.entity";

export class Competence {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({isArray: true, type: ImprovingCompetence})
    @IsOptional()
    improvingCompetence?: ImprovingCompetence;

    @ApiProperty({isArray: true, type: CompetenceCharacteristic})
    @IsOptional()
    competenceCharacteristic?: CompetenceCharacteristic;
}
