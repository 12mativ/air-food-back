import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FlightService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFlightDto: CreateFlightDto) {
    return this.prisma.flight.create({
      data: createFlightDto,
    });
  }

  findAll() {
    return this.prisma.flight.findMany({
      include: {
        airplane: true
      },
    });
  }

  findOne(id: string) {
    return this.prisma.flight.findFirst({
      where: {
        id: id,
      },
      include: {
        airplane: true
      },
    });
  }

  update(id: string, updateFlightDto: UpdateFlightDto) {
    return this.prisma.flight.update({
      where: { id: id },
      data: updateFlightDto,
    });
  }

  remove(id: string) {
    return this.prisma.flight.delete({
      where: {
        id: id,
      },
    });
  }
}
