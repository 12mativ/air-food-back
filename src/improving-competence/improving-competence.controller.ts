import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ImprovingCompetenceService } from './improving-competence.service';
import { CreateImprovingCompetenceDto } from './dto/create-improving-competence.dto';
import { UpdateImprovingCompetenceDto } from './dto/update-improving-competence.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("ImprovingСompetence")
@Controller('improving-competence')
export class ImprovingCompetenceController {
  constructor(private readonly improvingCompetenceService: ImprovingCompetenceService) {}

  @Post()
  create(@Body() createImprovingCompetenceDto: CreateImprovingCompetenceDto) {
    return this.improvingCompetenceService.create(createImprovingCompetenceDto);
  }

  @Get()
  findAll() {
    return this.improvingCompetenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.improvingCompetenceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImprovingCompetenceDto: UpdateImprovingCompetenceDto) {
    return this.improvingCompetenceService.update(id, updateImprovingCompetenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.improvingCompetenceService.remove(id);
  }
}
