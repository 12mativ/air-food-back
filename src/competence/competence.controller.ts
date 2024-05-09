import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Competence")
@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCompetenceDto: CreateCompetenceDto) {
    return this.competenceService.create(createCompetenceDto);
  }

  @Get()
  findAll() {
    return this.competenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return this.competenceService.update(+id, updateCompetenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenceService.remove(+id);
  }
}
