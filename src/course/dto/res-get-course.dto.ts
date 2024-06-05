import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ResGetStudentCompetenceCharacteristicDto } from '../../student-competence-characteristic/dto/res-get-student-competence-characteristic.dto';
import { ResGetImprovingCompetenceDto } from '../../improving-competence/dto/res-get-improving-competence.dto';

export class ResGetCourseDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate: string;

  @IsDateString()
  @ApiProperty()
  creatorId: string;

  @ApiProperty({type: ResGetStudentCompetenceCharacteristicDto, isArray: true})
  prerequisiteCompetencies: ResGetStudentCompetenceCharacteristicDto[];

  @ApiProperty({type: ResGetImprovingCompetenceDto, isArray: true})
  improvingCompetencies: ResGetImprovingCompetenceDto[];
}
