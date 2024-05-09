import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetenceCharacteristicService } from './competence-characteristic.service';
import { CreateCompetenceCharacteristicDto } from './dto/create-competence-characteristic.dto';
import { UpdateCompetenceCharacteristicDto } from './dto/update-competence-characteristic.dto';

@Controller('competence-characteristic')
export class CompetenceCharacteristicController {
  constructor(private readonly competenceCharacteristicService: CompetenceCharacteristicService) {}

  @Post()
  create(@Body() createCompetenceCharacteristicDto: CreateCompetenceCharacteristicDto) {
    return this.competenceCharacteristicService.create(createCompetenceCharacteristicDto);
  }

  @Get()
  findAll() {
    return this.competenceCharacteristicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenceCharacteristicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceCharacteristicDto: UpdateCompetenceCharacteristicDto) {
    return this.competenceCharacteristicService.update(+id, updateCompetenceCharacteristicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenceCharacteristicService.remove(+id);
  }
}
