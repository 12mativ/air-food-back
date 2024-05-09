import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Coach } from "src/coach/entities/coach.entity";
import { Event } from "src/event/entities/event.entity";

export class Simulator {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    events: Event[];

    @ApiProperty()
    coaches: Coach[];
}
