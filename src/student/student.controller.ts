import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { GetStudentsResponseDto } from './dto/get-students-response.dto';
import { StudentService } from './student.service';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';
import { Student } from './entities/student.entity';
import { Prisma } from '@prisma/client';
import { UpdateStudentRequestDto } from './dto/update-student-request.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  findStudentForSearch(
    @Query('studentForSearch') studentForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto,
  ): Promise<GetStudentsResponseDto> {
    return this.studentService.findStudents(studentForSearch, +page, +limit);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentRequestDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }
}
