import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/req-create-course.dto';
import { UpdateCourseDto } from './dto/req-update-course.dto';
import { ResGetCourseDto } from './dto/res-get-course.dto';
import { UpdateCourseDeleteStudentDto } from './dto/update-course-delete-student.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOkResponse({ type: ResGetCourseDto })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(
    @Headers('Authorization') auth: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    const jwt = auth.replace(/^Bearer\s/, '');
    return this.courseService.create(createCourseDto, jwt);
  }

  @Get('/admin')
  @Roles(Role.ADMIN)
  findAll() {
    return this.courseService.findAll();
  }

  @Get()
  @Roles(Role.COURSE_ORGANISER, Role.STUDENT, Role.COACH)
  @ApiOkResponse({ type: ResGetCourseDto, isArray: true })
  findAllForUser(@Headers('Authorization') auth: string) {
    const jwt = auth.replace(/^Bearer\s/, '');
    return this.courseService.findAllForUser(jwt);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER, Role.STUDENT, Role.COACH)
  @ApiOkResponse({ type: ResGetCourseDto })
  findOneCourse(@Param('id') id: string) {
    return this.courseService.findOneCourse(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({ type: ResGetCourseDto })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Patch('/delete-student/:id')
  @ApiOkResponse({ type: ResGetCourseDto })
  @Roles(Role.ADMIN)
  disconnectStudent(@Param('id') id: string, @Body() updateCourseDeleteStudentDto: UpdateCourseDeleteStudentDto) {
    return this.courseService.disconnectStudent(id, updateCourseDeleteStudentDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
