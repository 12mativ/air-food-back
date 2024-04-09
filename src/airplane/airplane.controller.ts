import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AirplaneService } from './airplane.service';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';

@Controller('airplane')
export class AirplaneController {
  constructor(private readonly airplaneService: AirplaneService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAirplaneDto: CreateAirplaneDto) {
    return this.airplaneService.create(createAirplaneDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.airplaneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airplaneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAirplaneDto: UpdateAirplaneDto) {
    return this.airplaneService.update(id, updateAirplaneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airplaneService.remove(id);
  }
}
