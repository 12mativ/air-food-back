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

    @ApiProperty({isArray: true, type: Event})
    events: Event[];

    @ApiProperty({isArray: true, type: Coach})
    coaches: Coach[];
}
