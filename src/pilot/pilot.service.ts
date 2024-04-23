import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPilotsResponseDto } from './dto/get-pilots-response.dto';
import { UpdatePilotRequestDto } from './dto/update-pilot-request.dto';

@Injectable()
export class PilotService {
  constructor(private readonly prisma: PrismaService) {}
  async findPilots(pilotForSearch: string, page: number, limit: number): Promise<GetPilotsResponseDto> {
    let pilotsTotalAmount;
    let pilots;

    page = page ? page : 1 
    limit = limit ? limit : 10 

    if (pilotForSearch) {
      pilotsTotalAmount = await this.prisma.pilot.count({
        where: {
          OR: [
            {
              email: {
                contains: pilotForSearch
              },
            },
            {
             firstName: {
              contains: pilotForSearch
             }
            },
            {
              lastName: {
               contains: pilotForSearch
              }
             }
          ]
        },
      })

      pilots = await this.prisma.pilot.findMany({
        where: {
          OR: [
            {
              email: {
                contains: pilotForSearch
              },
            },
            {
             firstName: {
              contains: pilotForSearch
             }
            },
            {
              lastName: {
               contains: pilotForSearch
              }
             }
          ]
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc'
        },
      });
      
    } else {
      pilotsTotalAmount = await this.prisma.pilot.count()
      pilots = await this.prisma.pilot.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: 'asc'
        },
      })
    }

    const payload = {pilots: pilots, pilotsTotalAmount: pilotsTotalAmount}

    return payload;
  }

  async updatePilot(id: string, updatePilotDto: UpdatePilotRequestDto) {
    const {firstName, lastName, birthDate} = updatePilotDto
    try {
      const updatedPilot = await this.prisma.pilot.update({
        where: {
          id
        },
        data: {
          firstName,
          lastName,
          birthDate
        }
      })
  
      return updatedPilot;
    } catch (e) {
      throw new BadRequestException("Произошла ошибка при обновлении данных обучающегося.")
    }
  }
}
