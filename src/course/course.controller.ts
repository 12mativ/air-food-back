import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course-request.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Public } from 'src/app.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/role/role.enum';
import { Course } from './entities/course.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiCreatedResponse({type: Course})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Body(new ValidationPipe()) createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({type: Course, isArray: true})
  @Roles(Role.ADMIN)
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: Course})
  @ApiParam({name: 'id'})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
