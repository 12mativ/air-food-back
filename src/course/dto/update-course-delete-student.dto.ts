import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDeleteStudentDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    idStudent?: string;
}
