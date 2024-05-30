import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEventDeleteCoachDto } from './dto/update-event-delete-coach.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const createdEvent = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        courseId: createEventDto.courseId,
      }
    })
    const course = await this.prisma.course.findFirst({
      where: {
        id: createEventDto.courseId
      }
    })

    const dates = {startDate: null, endDate: null}
    if(course.startDate == null && course.endDate == null){
      dates.startDate = createEventDto.startDate
      dates.endDate = createEventDto.endDate
    }
    else{
      if (new Date(createEventDto.startDate) < new Date(course.startDate)) {
        dates.startDate = createEventDto.startDate
      }
      else{
        dates.startDate = course.startDate
      }
      if (new Date(createEventDto.endDate) > new Date(course.endDate)) {
        dates.endDate = createEventDto.endDate
      }
      else{
        dates.endDate = course.endDate
      }
    }
    console.log(dates)
    await this.prisma.course.update({
      where: {
        id: createEventDto.courseId
      },
      data: {
        startDate: dates.startDate,
        endDate: dates.endDate
      }
    })
    return createdEvent;
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return events;
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id
      }
    }) 
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const { name, startDate, endDate, coachId, simulatorId } = updateEventDto;
    const coaches = coachId ? {connect: {id: coachId}} : {}
    const simulators = simulatorId ? {connect: {id: simulatorId}} : {}
    const updatedEvent = await this.prisma.event.update({
      where: {
        id: id
      },
      data: {
        name,
        startDate,
        endDate,
        coaches: coaches,
        simulators: simulators
      },
      include: {
        coaches: true,
        simulators: true
      }
    })

    return updatedEvent;
  }

  
  async disconnectCoach(id: string, updateEventDeleteCoachDto: UpdateEventDeleteCoachDto) {
    const currentEvent = await this.prisma.event.findFirst({
      where: {
        id,
      },
    })
    if (!currentEvent){
      throw new BadRequestException("События с таким id не существует")
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
    })
    if (!currentCoachOnEvent){
      throw new BadRequestException("Тренера с таким id на событии не существует")
    }

    const updateCourse = await this.prisma.event.update({
      where: {
        id: id,
      },
      data:{
        coaches: {
          disconnect: {
            id: updateEventDeleteCoachDto.idCoach,
          },
        },
      },
    })
    return updateCourse;
  }
  
  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
