import { ApiProperty } from '@nestjs/swagger';
import { ResGetCoachDto } from './res-get-coach.dto';

export class ResGetCoachesDto {
  @ApiProperty({ type: ResGetCoachDto, isArray: true })
  coaches: ResGetCoachDto[];

  @ApiProperty()
  coachesTotalAmount: number;
}
