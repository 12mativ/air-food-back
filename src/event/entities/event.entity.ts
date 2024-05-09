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

    @ApiProperty({isArray: true, type: Event})
    prerequisiteEvents: Event[];

    @ApiProperty({isArray: true, type: Event})
    eventsRelation: Event[];

    @ApiProperty({type: Course})
    course: Course;

    @ApiProperty({isArray: true, type: Coach})
    coaches: Coach[];

    @ApiProperty({isArray: true, type: Simulator})
    simulators: Simulator[];
}
