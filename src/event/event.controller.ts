import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { UpdateEventDeleteCoachDto } from './dto/update-event-delete-coach.dto';

@ApiTags("Event")
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(Role.ADMIN,Role.COURSE_ORGANISER)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN,Role.COURSE_ORGANISER)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Patch('/delete-coach/:id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  disconnectCoach(@Param('id') id: string, @Body() updateEventDeleteCoachDto: UpdateEventDeleteCoachDto) {
    return this.eventService.disconnectCoach(id, updateEventDeleteCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
