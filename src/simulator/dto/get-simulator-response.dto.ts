import { ApiProperty } from '@nestjs/swagger';
import { ResGetSimulatorDto } from './res-get-simulator.dto';

export class GetSimulatorsResponseDto {
  @ApiProperty({ type: ResGetSimulatorDto, isArray: true })
  simulator: ResGetSimulatorDto[];

  @ApiProperty()
  simulatorsTotalAmount: number;
}