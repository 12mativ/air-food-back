import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course-request.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
}
