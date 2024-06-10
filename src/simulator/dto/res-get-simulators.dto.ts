import { ApiProperty } from '@nestjs/swagger';
import { ResGetSimulatorDto } from './res-get-simulator.dto';

export class ResGetSimulatorsDto {
  @ApiProperty({ type: ResGetSimulatorDto, isArray: true })
  simulators: ResGetSimulatorDto[];

  @ApiProperty()
  simulatorsTotalAmount: number;
}
