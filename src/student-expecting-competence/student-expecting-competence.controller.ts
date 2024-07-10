import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ReqCreateStudentExpectingCompetenceDto } from './dto/req-create-student-expecting-competence.dto';
import { ReqUpdateStudentExpectingCompetenceDto } from './dto/req-update-student-expecting-competence.dto';
import { ResGetStudentExpectingCompetenceDto } from './dto/res-get-student-expecting-competence.dto';
import { StudentExpectingCompetenceService } from './student-expecting-competence.service';

@ApiTags('StudentExpectingCompetence')
@Controller('student-expecting-competence')
export class StudentExpectingCompetenceController {
  constructor(private readonly studentExpectingCompetenceService: StudentExpectingCompetenceService) {}

  @Post()
  @ApiOkResponse({ type: ResGetStudentExpectingCompetenceDto })
  @Roles(Role.ADMIN)
  create(@Body() createStudentExpectingCompetenceDto: ReqCreateStudentExpectingCompetenceDto) {
    return this.studentExpectingCompetenceService.create(createStudentExpectingCompetenceDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: ResGetStudentExpectingCompetenceDto })
  update(@Param('id') id: string, @Body() updateStudentExpectingCompetenceDto: ReqUpdateStudentExpectingCompetenceDto) {
    return this.studentExpectingCompetenceService.update(id, updateStudentExpectingCompetenceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.studentExpectingCompetenceService.remove(id);
  }
}
