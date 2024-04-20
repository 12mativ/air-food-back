import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { CreatePilotDto } from './dto/create-pilot.dto';
import { UpdatePilotDto } from './dto/update-pilot.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/role/role.enum';

@Controller('pilot')
export class PilotController {
  constructor(private readonly pilotService: PilotService) { }

  @Get()
  @Roles(Role.ADMIN)
  findAll(
    @Query('page') page: string, 
    @Query('limit') limit: string
  ) {
    return this.pilotService.findAll(+page, +limit);
  }

  @Get('find')
  @Roles(Role.ADMIN)
  findOne(
    @Query('pilotForSearch') pilotForSearch: string, 
  ) {
    return this.pilotService.findPilotsForString(pilotForSearch);
  }
}
