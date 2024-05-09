import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";
import { Coach } from "src/coach/entities/coach.entity";
import { Course } from "src/course/entities/course.entity";
import { Simulator } from "src/simulator/entities/simulator.entity";


export class Event {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDateString()
    startDate: string;
    
    @ApiProperty()
    @IsDateString()
    endDate: string;
    
    @ApiProperty()
    @IsString()
    courseId: string;

    @ApiProperty()
    prerequisiteEvents: Event[];

    @ApiProperty()
    eventsRelation: Event[];

    @ApiProperty()
    course: Course;

    @ApiProperty()
    coaches: Coach[];

    @ApiProperty()
    simulators: Simulator[];
}
