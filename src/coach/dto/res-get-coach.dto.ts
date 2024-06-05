import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ResGetEventDto } from '../../event/dto/res-get-event.dto';
import { ResGetSimulatorDto } from '../../simulator/dto/res-get-simulator.dto';


export class ResGetCoachDto {
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
  events: ResGetEventDto[];

  @ApiProperty({type: ResGetSimulatorDto, isArray: true})
  simulators: ResGetSimulatorDto[];
}
