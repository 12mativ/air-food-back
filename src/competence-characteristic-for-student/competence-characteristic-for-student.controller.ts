import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompetenceCharacteristicForStudentService } from './competence-characteristic-for-student.service';
import { CreateCompetenceCharacteristicForStudentDto } from './dto/create-competence-characteristic-for-student.dto';
import { UpdateCompetenceCharacteristicForStudentDto } from './dto/update-competence-characteristic-for-student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("CompetenceCharacteristicForStudent")
@Controller('competence-characteristic-for-student')
export class CompetenceCharacteristicForStudentController {
  constructor(private readonly competenceCharacteristicForStudentService: CompetenceCharacteristicForStudentService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCompetenceCharacteristicForStudentDto: CreateCompetenceCharacteristicForStudentDto) {
    return this.competenceCharacteristicForStudentService.create(createCompetenceCharacteristicForStudentDto);
  }

  @Get()
  findAll() {
    return this.competenceCharacteristicForStudentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenceCharacteristicForStudentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceCharacteristicForStudentDto: UpdateCompetenceCharacteristicForStudentDto) {
    return this.competenceCharacteristicForStudentService.update(id, updateCompetenceCharacteristicForStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenceCharacteristicForStudentService.remove(id);
  }
}
