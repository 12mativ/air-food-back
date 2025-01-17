import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Curriculum')
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.create(createCurriculumDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurriculumDto: UpdateCurriculumDto) {
    return this.curriculumService.update(+id, updateCurriculumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curriculumService.remove(+id);
  }
}
