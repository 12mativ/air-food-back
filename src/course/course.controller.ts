import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course-request.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { UpdateCourseDeleteStudentDto } from './dto/update-course-delete-student.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOkResponse({type: Course})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Headers('Authorization') auth: string, @Body() createCourseDto: CreateCourseDto) {
    const jwt = auth.replace(/^Bearer\s/, "");
    return this.courseService.create(createCourseDto, jwt);
  }

  @Get("/admin")
  @Roles(Role.ADMIN)
  findAll() {
    return this.courseService.findAll();
  }

  @Get()
  @Roles(Role.COURSE_ORGANISER, Role.STUDENT, Role.COACH)
  findAllForUser(@Headers('Authorization') auth: string) {
    const jwt = auth.replace(/^Bearer\s/, "");
    return this.courseService.findAllForUser(jwt);
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Patch('/delete-student/:id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  disconnectStudent(@Param('id') id: string, @Body() updateCourseDeleteStudentDto: UpdateCourseDeleteStudentDto) {
    return this.courseService.disconnectStudent(id, updateCourseDeleteStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
