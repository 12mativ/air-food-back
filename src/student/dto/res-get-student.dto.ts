import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ResGetStudentCompetenceCharacteristicDto } from '../../student-competence-characteristic/dto/res-get-student-competence-characteristic.dto';
import { ResGetSchedule } from './res-get-schedule.dto';
import { ResGetCurriculumDto } from '../../curriculum/dto/res-get-curriculum.dto';

class CourseForStudentDto {
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
}

export class ResGetStudentDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  scheduleId: string;

  @ApiProperty()
  @IsString()
  curriculumId: string;

  @ApiProperty({type: ResGetSchedule})
  schedule: ResGetSchedule

  @ApiProperty({type: ResGetCurriculumDto})
  curriculum: ResGetCurriculumDto

  @ApiProperty({
    type: ResGetStudentCompetenceCharacteristicDto,
    isArray: true,
  })
  competencies: ResGetStudentCompetenceCharacteristicDto[];

  @ApiProperty({
    type: CourseForStudentDto,
    isArray: true,
  })
  courses: CourseForStudentDto[];
}
