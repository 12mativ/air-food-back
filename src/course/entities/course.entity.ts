import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";
import { CompetenceCharacteristic } from "src/competence-characteristic/entities/competence-characteristic.entity";
import { Event } from "src/event/entities/event.entity";
import { ImprovingCompetence } from "src/improving-competence/entities/improving-competence.entity";

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
    
    @ApiProperty()
    prerequisiteCompetencies: CompetenceCharacteristic[];

    @ApiProperty()
    improvingCompetencies: ImprovingCompetence[];

    @ApiProperty()
    events: Event[];
}