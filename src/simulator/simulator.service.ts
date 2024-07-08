import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { ResGetSimulatorsDto } from './dto/res-get-simulators.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';

@Injectable()
export class SimulatorService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSimulatorDto: CreateSimulatorDto) {
    const { name, courseId } = createSimulatorDto;

    const currentCourse = await this.prisma.course.findFirst({
      where: { id: courseId },
    });
    if (!currentCourse) {
      throw new BadRequestException('Курса с таким id не существует');
    }
    
    const createdSimulator = await this.prisma.simulator.create({
      data: {
        name,
        courseId
      },
    });
    return createdSimulator;
  }

  // async findSimulators(
  //   simulatorForSearch: string,
  //   page: number,
  //   limit: number,
  // ): Promise<ResGetSimulatorsDto> {
  //   let simulatorsTotalAmount;
  //   let simulators;

  //   page = page ? page : 1;
  //   limit = limit ? limit : 10;

  //   if (simulatorForSearch) {
  //     simulatorsTotalAmount = await this.prisma.simulator.count({
  //       where: {
  //         OR: [
  //           {
  //             name: {
  //               contains: simulatorForSearch,
  //             },
  //           },
  //         ],
  //       },
  //     });

  //     simulators = await this.prisma.simulator.findMany({
  //       where: {
  //         OR: [
  //           {
  //             name: {
  //               contains: simulatorForSearch,
  //             },
  //           },
  //         ],
  //       },
  //       skip: (page - 1) * limit,
  //       take: limit,
  //       orderBy: {
  //         id: 'asc',
  //       },
  //     });
  //   } else {
  //     simulatorsTotalAmount = await this.prisma.simulator.count();
  //     simulators = await this.prisma.simulator.findMany({
  //       skip: (page - 1) * limit,
  //       take: limit,
  //       orderBy: {
  //         id: 'asc',
  //       },
  //     });
  //   }

  //   const payload = {
  //     simulators: simulators,
  //     simulatorsTotalAmount: simulatorsTotalAmount,
  //   };

  //   return payload;
  // }

  async findSimulatorsOnCourse(courseId: string) {
    const simulators = await this.prisma.simulator.findMany({
      where: {
        events: {
          every: {
            courseId: courseId,
          },
        },
      },
    });

    return simulators;
  }
  async findSimulatorsOnEvent(eventId: string) {

    const simulators = await this.prisma.simulator.findMany({
      where: {
        events: {
          every: {
            id: eventId,
          },
        },
      },
    });

    return simulators;
  }
  async update(id: string, updateSimulatorDto: UpdateSimulatorDto) {
    const { name } = updateSimulatorDto;
    try {
      const updatedSimulator = await this.prisma.simulator.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return updatedSimulator;
    } catch (e) {
      throw new BadRequestException(
        'Произошла ошибка при обновлении данных обучающегося.',
      );
    }
  }

  async remove(id: string) {
    const currentSimulator = await this.prisma.simulator.findFirst({
      where: {
        id,
      },
    });

    if (!currentSimulator) {
      throw new BadRequestException('Тренажера с таким id не существует');
    }

    await this.prisma.simulator.delete({
      where: {
        id,
      },
    });
  }
}
