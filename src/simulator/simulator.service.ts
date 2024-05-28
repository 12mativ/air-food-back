import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Simulator } from './entities/simulator.entity';
import { GetSimulatorsResponseDto } from './dto/get-simulator-response.dto';

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

  async findSimulators(
    simulatorForSearch: string,
    page: number,
    limit: number,
  ): Promise<GetSimulatorsResponseDto> {
    let simulatorsTotalAmount;
    let simulators;

    page = page ? page : 1;
    limit = limit ? limit : 10;

    if (simulatorForSearch) {
      simulatorsTotalAmount = await this.prisma.simulator.count({
        where: {
          OR: [
            {
              name: {
                contains: simulatorForSearch,
              },
            },
          ],
        },
      });

      simulators = await this.prisma.simulator.findMany({
        where: {
          OR: [
            {
              name: {
                contains: simulatorForSearch,
              },
            },
          ],
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
        include: {
          events: true
        }
      });
    } else {
      simulatorsTotalAmount = await this.prisma.simulator.count();
      simulators = await this.prisma.simulator.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
        include: {
          events: true
        }
      });
    }

    const payload = {
      simulator: simulators,
      simulatorsTotalAmount: simulatorsTotalAmount,
    };

    return payload;
  }

  async update(id: string, updateSimulatorDto: UpdateSimulatorDto) {
    const { name } = updateSimulatorDto;
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
