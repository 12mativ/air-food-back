import { ApiProperty } from "@nestjs/swagger";
import { Coach } from "../entities/coach.entity";


export class GetCoachesResponseDto {
    @ApiProperty()
    coaches: Coach[];
    
    @ApiProperty()
    coachesTotalAmount: number
}