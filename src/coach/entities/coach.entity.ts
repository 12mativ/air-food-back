import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Event } from "src/event/entities/event.entity";
import { Simulator } from "src/simulator/entities/simulator.entity";


export class Coach {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    surname?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName?: string;
    
    @ApiProperty()
    events: Event[];

    @ApiProperty()
    simulators: Simulator[];
}
