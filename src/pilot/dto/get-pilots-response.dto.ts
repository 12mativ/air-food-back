import { ApiProperty } from "@nestjs/swagger";
import { Pilot } from "../entities/pilot.entity";

export class GetPilotsResponseDto {
    @ApiProperty({
        isArray: true,
        type: Pilot,
    })
    pilots: Pilot[];
    
    @ApiProperty()
    pilotsTotalAmount: number
}
