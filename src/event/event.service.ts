import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/req-create-event.dto';
import { UpdateEventDto } from './dto/req-update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEventDeleteCoachDto } from './dto/req-update-event-delete-coach.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

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
      include: {
        coaches: true,
        simulators: true,
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

  async update(id: string, updateEventDto: UpdateEventDto) {
    const { name, startDate, endDate, coachId, simulatorId } = updateEventDto;
    const coaches = coachId ? { connect: { id: coachId } } : {};
    const simulators = simulatorId ? { connect: { id: simulatorId } } : {};
    const currentCoach = await this.prisma.coach.findFirst({
      where: { id: coachId },
    });
    const currentSimulator = await this.prisma.simulator.findFirst({
      where: { id: simulatorId },
    });
    if (!currentCoach) {
      throw new BadRequestException('Тренера с таким id не существует');
    }
    if (!currentSimulator) {
      throw new BadRequestException('Тренажера с таким id не существует');
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
      include: {
        coaches: true,
        simulators: true,
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
      throw new BadRequestException('События с таким id не существует');
    }

    const currentCoachOnEvent = await this.prisma.event.findFirst({
      where: {
        id,
        coaches: {
          some: {
            id: updateEventDeleteCoachDto.idCoach,
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
        id: id,
      },
      data: {
        coaches: {
          disconnect: {
            id: updateEventDeleteCoachDto.idCoach,
          },
        },
      },
    });
    return updateCourse;
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
