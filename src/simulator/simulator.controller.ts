import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { ResGetSimulatorsDto } from './dto/res-get-simulators.dto';
import { ResGetSimulatorDto } from './dto/res-get-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { SimulatorService } from './simulator.service';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';

@ApiTags('Simulator')
@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({ type: ResGetSimulatorDto })
  create(@Body() createSimulatorDto: CreateSimulatorDto) {
    return this.simulatorService.create(createSimulatorDto);
  }

  // @Get()
  // @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  // @ApiOkResponse({ type: ResGetSimulatorsDto, isArray: true })
  // @ApiQuery({ name: 'page' })
  // @ApiQuery({ name: 'limit' })
  // findSimulatorForSearch(
  //   @Query('simulatorForSearch') simulatorForSearch: string,
  //   @Query('page') page: PageRequestDto,
  //   @Query('limit') limit: LimitRequestDto,
  // ): Promise<ResGetSimulatorsDto> {
  //   return this.simulatorService.findSimulators(
  //     simulatorForSearch,
  //     +page,
  //     +limit,
  //   );
  // }

  @Get(':courseId')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({ type: ResGetSimulatorDto, isArray: true })
  findSimulatorsOnCourse(@Param('courseId') courseId: string) {
    return this.simulatorService.findSimulatorsOnCourse(courseId);
  }

  @Get(':eventId')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({ type: ResGetSimulatorDto, isArray: true })
  findSimulatorsOnEvent(@Param('eventId') eventId: string) {
    return this.simulatorService.findSimulatorsOnEvent(eventId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResGetSimulatorDto })
  update(
    @Param('id') id: string,
    @Body() updateSimulatorDto: UpdateSimulatorDto,
  ) {
    return this.simulatorService.update(id, updateSimulatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulatorService.remove(id);
  }
}
