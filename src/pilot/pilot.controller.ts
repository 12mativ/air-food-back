import { Body, Controller, Get, Param, Patch, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { GetPilotsResponseDto } from './dto/get-pilots-response.dto';
import { PilotService } from './pilot.service';
import { PageRequestDto } from './dto/query-page-request.dto';
import { LimitRequestDto } from './dto/query-limit-request.dto';
import { Pilot } from './entities/pilot.entity';
import { Prisma } from '@prisma/client';
import { UpdatePilotRequestDto } from './dto/update-pilot-request.dto';

@ApiTags('Pilot')
@Controller('pilot')
export class PilotController {
  constructor(private readonly pilotService: PilotService) { }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: GetPilotsResponseDto })
  @ApiQuery({name: "page"})
  @ApiQuery({name: "limit"})
  findPilotForSearch(
    @Query('pilotForSearch') pilotForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto
  ): Promise<GetPilotsResponseDto> {
    return this.pilotService.findPilots(pilotForSearch, +page, +limit);
  }

  @Roles(Role.ADMIN)
  @ApiOkResponse({type: Pilot})
  @Patch(":id")
  updatePilot(
    @Param('id') id: string, 
    @Body(new ValidationPipe()) updatePilotDto: UpdatePilotRequestDto
  ): Promise<Pilot> {
    return this.pilotService.updatePilot(id, updatePilotDto)
  }
}