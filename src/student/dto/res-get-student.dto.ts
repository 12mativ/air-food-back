import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ResGetCourseDto } from 'src/course/dto/res-get-course.dto';
import { Course } from 'src/course/entities/course.entity';
import { ResGetStudentCompetenceCharacteristicDto } from 'src/student-competence-characteristic/dto/res-get-student-competence-characteristic.dto';

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

  @ApiProperty({
    type: ResGetStudentCompetenceCharacteristicDto,
    isArray: true,
  })
  competences: ResGetStudentCompetenceCharacteristicDto[];

  @ApiProperty({
    type: ResGetCourseDto,
    isArray: true,
  })
  courses: ResGetCourseDto[];
}
