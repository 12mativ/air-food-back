import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CompetenceService } from './competence.service';
import { ReqCreateCompetenceDto } from './dto/req-create-competence.dto';
import { ResGetCompetenceDto } from './dto/res-get-competence.dto';

@ApiTags('Competence')
@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  @ApiOkResponse({
    type: ResGetCompetenceDto,
  })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Body() createCompetenceDto: ReqCreateCompetenceDto) {
    return this.competenceService.create(createCompetenceDto);
  }

  @Get()
  @ApiOkResponse({
    type: ResGetCompetenceDto,
    isArray: true,
  })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  findAll() {
    return this.competenceService.findAll();
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  remove(@Param('id') id: string) {
    return this.competenceService.remove(id);
  }
}
