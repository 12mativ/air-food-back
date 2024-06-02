import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/req-create-event.dto';
import { UpdateEventDto } from './dto/req-update-event.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { UpdateEventDeleteCoachDto } from './dto/req-update-event-delete-coach.dto';
import { ResGetEventDto } from './dto/res-get-event.dto';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOkResponse({type: ResGetEventDto})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Patch(':id')
  @ApiOkResponse({type: ResGetEventDto})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Patch('/delete-coach/:id')
  @ApiOkResponse({type: ResGetEventDto})
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  disconnectCoach(
    @Param('id') id: string,
    @Body() updateEventDeleteCoachDto: UpdateEventDeleteCoachDto,
  ) {
    return this.eventService.disconnectCoach(id, updateEventDeleteCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
