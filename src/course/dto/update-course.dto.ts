import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course-request.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
