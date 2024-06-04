import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateEventDto } from './dto/req-create-event.dto';
import { UpdateEventDeleteCoachDto } from './dto/req-update-event-delete-coach.dto';
import { updateEventDeleteSimulatorDto } from './dto/req-update-event-delete-simulator.dto';
import { UpdateEventDto } from './dto/req-update-event.dto';
import { ResGetEventDto } from './dto/res-get-event.dto';
import { EventService } from './event.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOkResponse({ type: ResGetEventDto })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get(':courseId')
  @ApiParam({ name: 'courseId' })
  @ApiOkResponse({ type: ResGetEventDto, isArray: true })
  findEvents(
    @Param('courseId') courseId: string,
    @Headers('Authorization') auth: string,
  ) {
    const jwt = auth.replace(/^Bearer\s/, '');
    return this.eventService.findEvents(courseId, jwt);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResGetEventDto })
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Patch('/delete-coach/:id')
  @ApiOkResponse({ type: ResGetEventDto })
  @Roles(Role.ADMIN)
  disconnectCoach(
    @Param('id') id: string,
    @Body() updateEventDeleteCoachDto: UpdateEventDeleteCoachDto,
  ) {
    return this.eventService.disconnectCoach(id, updateEventDeleteCoachDto);
  }

  @Patch('/delete-simulator/:id')
  @ApiOkResponse({ type: ResGetEventDto })
  @Roles(Role.ADMIN)
  disconnectSimulator(
    @Param('id') id: string,
    @Body() updateEventDeleteSimulatorDto: updateEventDeleteSimulatorDto,
  ) {
    return this.eventService.disconnectSimulator(
      id,
      updateEventDeleteSimulatorDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
