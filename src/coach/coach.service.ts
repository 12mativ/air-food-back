import { BadRequestException, Injectable } from '@nestjs/common';
import { ReqUpdateCoachDto } from './dto/req-update-coach.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResGetCoachesDto } from './dto/res-get-coaches.dto';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) {}
  async findCoaches(
    coachForSearch: string,
    page: number,
    limit: number,
  ): Promise<ResGetCoachesDto> {
    let coachesTotalAmount;
    let coaches;

    page = page ? page : 1;
    limit = limit ? limit : 10;

    if (coachForSearch) {
      coachesTotalAmount = await this.prisma.coach.count({
        where: {
          OR: [
            {
              email: {
                contains: coachForSearch,
              },
            },
            {
              firstName: {
                contains: coachForSearch,
              },
            },
            {
              lastName: {
                contains: coachForSearch,
              },
            },
          ],
        },
      });

      coaches = await this.prisma.coach.findMany({
        where: {
          OR: [
            {
              email: {
                contains: coachForSearch,
              },
            },
            {
              firstName: {
                contains: coachForSearch,
              },
            },
            {
              lastName: {
                contains: coachForSearch,
              },
            },
            {
              middleName: {
                contains: coachForSearch,
              },
            },
          ],
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
      });
    } else {
      coachesTotalAmount = await this.prisma.coach.count();
      coaches = await this.prisma.coach.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc',
        },
      });
    }

    const payload = {
      coaches: coaches,
      coachesTotalAmount: coachesTotalAmount,
    };

    return payload;
  }

  async getCoachesOnEvent(eventId: string) {
    const coaches = await this.prisma.event.findFirst({
      where: {
        id: eventId
      },
      select: {
        coaches: true
      }
    })

    return coaches;
  }

  async update(id: string, updateCoachDto: ReqUpdateCoachDto) {
    const { firstName, lastName, middleName, simulatorId } = updateCoachDto;
    const simulators = simulatorId ? { connect: { id: simulatorId } } : {};
    if (simulatorId) {
      const currentSimulator = await this.prisma.simulator.findFirst({
        where: { id: simulatorId },
      });
      if (!currentSimulator) {
        throw new BadRequestException('Тренажера с таким id не существует');
      }
    }
    const updatedCoach = await this.prisma.coach.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        middleName,
        simulators: simulators,
      },
    });
    return updatedCoach;
  }
}
