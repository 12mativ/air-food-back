import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto } from './dto/create-competence-request.dto';
import { GetCompetenceResponseDto } from './dto/get-competence-response.dto';

@ApiTags('Competence')
@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  @ApiOkResponse({
    type: GetCompetenceResponseDto,
  })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competenceService.create(createCompetenceDto);
  }

  @Get()
  @ApiOkResponse({
    type: GetCompetenceResponseDto,
    isArray: true
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
