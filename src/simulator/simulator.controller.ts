import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LimitRequestDto } from 'src/pagination/dto/query-limit-request.dto';
import { PageRequestDto } from 'src/pagination/dto/query-page-request.dto';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { GetSimulatorsResponseDto } from './dto/get-simulator-response.dto';
import { ResGetSimulatorDto } from './dto/res-get-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { SimulatorService } from './simulator.service';

@ApiTags("Simulator")
@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetSimulatorDto})
  create(@Body() createSimulatorDto: CreateSimulatorDto) {
    return this.simulatorService.create(createSimulatorDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetSimulatorDto, isArray: true})
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  findSimulatorForSearch(
    @Query('simulatorForSearch') simulatorForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto,
  ): Promise<GetSimulatorsResponseDto> {
    return this.simulatorService.findSimulators(simulatorForSearch, +page, +limit);
  }

  @Patch(':id')
  @ApiOkResponse({type: ResGetSimulatorDto})
  update(@Param('id') id: string, @Body() updateSimulatorDto: UpdateSimulatorDto) {
    return this.simulatorService.update(id, updateSimulatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulatorService.remove(id);
  }
}
