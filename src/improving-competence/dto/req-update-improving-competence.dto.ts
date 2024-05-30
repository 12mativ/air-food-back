import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ReqUpdateImprovingCompetenceDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  improvingValue?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  competenceId?: string;
}
