import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const createdEvent = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        courseId: createEventDto.courseId
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

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
