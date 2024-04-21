import { Controller, Get, Query } from '@nestjs/common';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { PilotService } from './pilot.service';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pilot } from './entities/pilot.entity';

@ApiTags('Pilot')
@Controller('pilot')
export class PilotController {
  constructor(private readonly pilotService: PilotService) { }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Pilot, isArray: true })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ): Promise<{pilots: Pilot[]; pilotsTotalAmount: number}> {
    return this.pilotService.findAll(+page, +limit);
  }

  @Get('find')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Pilot, isArray: true })
  findPilotForSearch(
    @Query('pilotForSearch') pilotForSearch: string,
  ): Promise<Pilot[]> {
    return this.pilotService.findPilotsForString(pilotForSearch);
  }
}
