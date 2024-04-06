import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/role/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('airplane')
export class AirplaneController {
  constructor(private readonly airplaneService: AirplaneService) {}

  @Post()
  create(@Body() createAirplaneDto: CreateAirplaneDto) {
    return this.airplaneService.create(createAirplaneDto);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
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
