import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CompetenceCharacteristicForCourseService } from './competence-characteristic-for-course.service';
import { CreateCompetenceCharacteristicForCourseDto } from './dto/create-competence-characteristic-for-course.dto';
import { UpdateCompetenceCharacteristicForCourseDto } from './dto/update-competence-characteristic-for-course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("CompetenceCharacteristicForCourse")
@Controller('competence-characteristic-for-course')
export class CompetenceCharacteristicForCourseController {
  constructor(private readonly competenceCharacteristicForCourseService: CompetenceCharacteristicForCourseService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCompetenceCharacteristicForCourseDto: CreateCompetenceCharacteristicForCourseDto) {
    return this.competenceCharacteristicForCourseService.create(createCompetenceCharacteristicForCourseDto);
  }

  @Get()
  findAll() {
    return this.competenceCharacteristicForCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenceCharacteristicForCourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceCharacteristicForCourseDto: UpdateCompetenceCharacteristicForCourseDto) {
    return this.competenceCharacteristicForCourseService.update(id, updateCompetenceCharacteristicForCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenceCharacteristicForCourseService.remove(id);
  }
}
