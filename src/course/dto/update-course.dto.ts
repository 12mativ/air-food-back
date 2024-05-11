import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course-request.dto';
import { IsOptional, IsString } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    startDate?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    endDate?: string;
}
