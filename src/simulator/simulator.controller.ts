import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { PageRequestDto } from 'src/pagination/dto/query-page-request.dto';
import { Role } from 'src/role/role.enum';
import { LimitRequestDto } from 'src/pagination/dto/query-limit-request.dto';
import { GetSimulatorsResponseDto } from './dto/get-simulator-response.dto';

@ApiTags("Simulator")
@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post()
  create(@Body() createSimulatorDto: CreateSimulatorDto) {
    return this.simulatorService.create(createSimulatorDto);
  }

  @Get()
  @Roles(Role.ADMIN)
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
  update(@Param('id') id: string, @Body() updateSimulatorDto: UpdateSimulatorDto) {
    return this.simulatorService.update(id, updateSimulatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulatorService.remove(+id);
  }
}
