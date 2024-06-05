import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { ReqCreateImprovingCompetenceDto } from './dto/req-create-improving-competence.dto';
import { ReqUpdateImprovingCompetenceDto } from './dto/req-update-improving-competence.dto';
import { ResGetImprovingCompetenceDto } from './dto/res-get-improving-competence.dto';
import { ImprovingCompetenceService } from './improving-competence.service';

@ApiTags('ImprovingСompetence')
@Controller('improving-competence')
export class ImprovingCompetenceController {
  constructor(
    private readonly improvingCompetenceService: ImprovingCompetenceService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetImprovingCompetenceDto})
  create(
    @Body() createImprovingCompetenceDto: ReqCreateImprovingCompetenceDto,
  ) {
    return this.improvingCompetenceService.create(createImprovingCompetenceDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetImprovingCompetenceDto})
  update(
    @Param('id') id: string,
    @Body() updateImprovingCompetenceDto: ReqUpdateImprovingCompetenceDto,
  ) {
    return this.improvingCompetenceService.update(
      id,
      updateImprovingCompetenceDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  remove(@Param('id') id: string) {
    return this.improvingCompetenceService.remove(id);
  }
}
