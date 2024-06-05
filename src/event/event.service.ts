import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import { CreateEventDto } from './dto/req-create-event.dto';
import { UpdateEventDeleteCoachDto } from './dto/req-update-event-delete-coach.dto';
import { updateEventDeleteSimulatorDto } from './dto/req-update-event-delete-simulator.dto';
import { UpdateEventDto } from './dto/req-update-event.dto';
import { Role } from '../role/role.enum';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const course = await this.prisma.course.findFirst({
      where: {
        id: createEventDto.courseId,
      },
    });

    if (!course) {
      throw new BadRequestException('Курса с таким id не существует');
    }

    const createdEvent = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        courseId: createEventDto.courseId,
      },
    });

    const dates = { startDate: null, endDate: null };
    if (course.startDate == null && course.endDate == null) {
      dates.startDate = createEventDto.startDate;
      dates.endDate = createEventDto.endDate;
    } else {
      if (new Date(createEventDto.startDate) < new Date(course.startDate)) {
        dates.startDate = createEventDto.startDate;
      } else {
        dates.startDate = course.startDate;
      }
      if (new Date(createEventDto.endDate) > new Date(course.endDate)) {
        dates.endDate = createEventDto.endDate;
      } else {
        dates.endDate = course.endDate;
      }
    }

    await this.prisma.course.update({
      where: {
        id: createEventDto.courseId,
      },
      data: {
        startDate: dates.startDate,
        endDate: dates.endDate,
      },
    });
    return createdEvent;
  }

  async findEvents(courseId: string, jwt: string) {
    const decodedJwt = this.jwtService.decode(jwt);

    const user = await this.prisma.user.findFirst({
      where: {
        email: decodedJwt.email,
      },
    });

    const selectForCoach = {
      where: {
        coaches: {
          some: {
            id: user.id,
          },
        },
      },
    };

    const events = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
      select: {
        events: user.roles.includes(Role.COACH) ? selectForCoach : true,
      },
    });

    return events;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const { name, startDate, endDate, coachId, simulatorId } = updateEventDto;
    const coaches = coachId ? { connect: { id: coachId } } : {};
    const simulators = simulatorId ? { connect: { id: simulatorId } } : {};
    const currentEvent = await this.prisma.event.findFirst({
      where: { id },
    });
    if (!currentEvent) {
      throw new BadRequestException('Мероприятия с таким id не существует');
    }
    if (coachId) {
      const currentCoach = await this.prisma.coach.findFirst({
        where: { id: coachId },
      });
      if (!currentCoach) {
        throw new BadRequestException('Тренера с таким id не существует');
      }
    }
    if (simulatorId) {
      const currentSimulator = await this.prisma.simulator.findFirst({
        where: { id: simulatorId },
      });
      if (!currentSimulator) {
        throw new BadRequestException('Тренажера с таким id не существует');
      }
    }
    const updatedEvent = await this.prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name,
        startDate,
        endDate,
        coaches: coaches,
        simulators: simulators,
      },
    });

    return updatedEvent;
  }

  async disconnectCoach(
    id: string,
    updateEventDeleteCoachDto: UpdateEventDeleteCoachDto,
  ) {
    const currentEvent = await this.prisma.event.findFirst({
      where: {
        id,
      },
    });
    if (!currentEvent) {
      throw new BadRequestException('Мероприятия с таким id не существует');
    }

    const currentCoachOnEvent = await this.prisma.event.findFirst({
      where: {
        id,
        coaches: {
          some: {
            id: updateEventDeleteCoachDto.coachId,
          },
        },
      },
    });
    if (!currentCoachOnEvent) {
      throw new BadRequestException(
        'Тренера с таким id на событии не существует',
      );
    }

    const updateCourse = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        coaches: {
          disconnect: {
            id: updateEventDeleteCoachDto.coachId,
          },
        },
      },
    });
    return updateCourse;
  }

  async disconnectSimulator(
    id: string,
    updateEventDeleteSimulatorDto: updateEventDeleteSimulatorDto,
  ) {
    const currentEvent = await this.prisma.event.findFirst({
      where: {
        id,
      },
    });
    if (!currentEvent) {
      throw new BadRequestException('Мероприятия с таким id не существует');
    }

    const currentSimulatorOnEvent = await this.prisma.event.findFirst({
      where: {
        id,
        simulators: {
          some: {
            id: updateEventDeleteSimulatorDto.simulatorId,
          },
        },
      },
    });
    if (!currentSimulatorOnEvent) {
      throw new BadRequestException(
        'Тренажера с таким id на событии не существует',
      );
    }

    const updateEvent = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        simulators: {
          disconnect: {
            id: updateEventDeleteSimulatorDto.simulatorId,
          },
        },
      },
    });
    return updateEvent;
  }

  async remove(id: string) {
    const event = await this.prisma.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw new BadRequestException('Мероприятия с таким id не существует');
    }

    await this.prisma.event.delete({
      where: { id },
    });
  }
}
