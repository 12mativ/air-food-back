import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCoachesResponseDto } from './dto/get-coach-response.dto';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) {}
  async findCoaches(
    coachForSearch: string,
    page: number,
    limit: number,
  ): Promise<GetCoachesResponseDto> {
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
        include: {
          events: true
        }
      });
    } else {
      coachesTotalAmount = await this.prisma.coach.count();
      coaches = await this.prisma.coach.findMany({
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
      coaches: coaches,
      coachesTotalAmount: coachesTotalAmount,
    };

    return payload;
  }

  async update(id: string, updateCoachDto: UpdateCoachDto) {
    const {firstName, lastName, middleName} = updateCoachDto
    const updatedCoach = await this.prisma.coach.update({
      where: {
        id
      },
      data: { 
        firstName, 
        lastName, 
        middleName
      }
    })
    return updatedCoach;
  }
}
