import { ApiProperty } from "@nestjs/swagger";
import { Simulator } from "../entities/simulator.entity";


export class GetSimulatorsResponseDto {
    @ApiProperty()
    simulator: Simulator[];
    
    @ApiProperty()
    simulatorsTotalAmount: number
}