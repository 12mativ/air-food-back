import { ApiProperty } from "@nestjs/swagger";
import { CompetenceCharacteristicForCourse } from "@prisma/client";
import { IsDateString, IsString } from "class-validator";
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
    
    @IsDateString()
    @ApiProperty()
    creatorId: string;
    
    @ApiProperty()
    prerequisiteCompetencies: CompetenceCharacteristicForCourse[];

    @ApiProperty()
    improvingCompetencies: ImprovingCompetence[];

    @ApiProperty()
    events: Event[];
}