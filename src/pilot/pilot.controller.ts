import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/role/role.enum';

@Controller('pilot')
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}
  
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.pilotService.findAll();
  }
  
  @Get('find')
  @Roles(Role.ADMIN)
  findOne(@Query('pilotForSearch') pilotForSearch: string) {
    return this.pilotService.findPilotsForString(pilotForSearch);
  } 
}
