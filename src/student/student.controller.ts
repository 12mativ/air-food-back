import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { UpdateStudentRequestDto } from './dto/req-update-student.dto';
import { GetStudentsResponseDto } from './dto/res-get-students.dto';
import { StudentService } from './student.service';
import { ResGetStudentDto } from './dto/res-get-student.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ApiOkResponse({type: GetStudentsResponseDto})
  findStudentForSearch(
    @Query('studentForSearch') studentForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto,
  ): Promise<GetStudentsResponseDto> {
    return this.studentService.findStudents(studentForSearch, +page, +limit);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOkResponse({type: ResGetStudentDto})
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentRequestDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }
}
