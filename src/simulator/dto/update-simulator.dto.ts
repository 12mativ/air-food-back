import { PartialType } from '@nestjs/swagger';
import { CreateSimulatorDto } from './create-simulator.dto';

export class UpdateSimulatorDto extends PartialType(CreateSimulatorDto) {}
