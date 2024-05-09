import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Simulator } from './entities/simulator.entity';

@Injectable()
export class SimulatorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSimulatorDto: CreateSimulatorDto) {
    const createdSimulator = await this.prisma.simulator.create({
      data: {
        ...createSimulatorDto
      },
      include: {
        coaches: true,
        events: true
      }
    })
    return createdSimulator;
  }

  async findAll() {
    const response = await this.prisma.simulator.findMany({
      include: {
        coaches: true,
        events: true
      }
    })
    return response;
  }

  async findOne(id: string) {
    const simulator = await this.prisma.simulator.findFirst({
      where: {
        id
      },
      include: {
        coaches: true,
        events: true
      }
    })

    if (!simulator) {
      throw new BadRequestException("Симулятора с таким id не существует")
    }


    return simulator;
  }

  async update(id: string, updateSimulatorDto: UpdateSimulatorDto) {
    const { name } = UpdateSimulatorDto;
    try {
      const updatedSimulator = await this.prisma.simulator.update({
        where: {
          id,
        },
        data: {
          id,
          name
        },
      });

      return updatedSimulator;
    } catch (e) {
      throw new BadRequestException(
        'Произошла ошибка при обновлении данных обучающегося.',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} simulator`;
  }
}
