import { Injectable } from '@nestjs/common';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AirplaneService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAirplaneDto: CreateAirplaneDto) {
    return this.prisma.airplane.create({
      data: createAirplaneDto
    });
  }

  findAll() {
    return this.prisma.airplane.findMany();
  }

  findOne(id: string) {
    return this.prisma.airplane.findFirst({
      where: {
        id: id
      }
    });
  }

  update(id: string, updateAirplaneDto: UpdateAirplaneDto) {
    return this.prisma.airplane.update({
      where: {
        id: id
      },
      data: updateAirplaneDto
    });
  }

  remove(id: string) {
    return this.prisma.airplane.delete({
      where: {
        id: id
      }
    });
  }
}
