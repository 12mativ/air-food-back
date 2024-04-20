import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PilotService {
  constructor(private readonly prisma: PrismaService) {}
  async findPilotsForString(pilotForSearch: string) {
    return await this.prisma.pilot.findMany({
      where: {
        OR: [
          {
            username: {
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
      }
    });
  }

  async findAll(page: number, limit: number) {
    let pageValue = page;
    let limitValue = limit;
    if (!page) {
      pageValue = 1
    }

    if (!limit) {
      limitValue = 10
    }
    return await this.prisma.pilot.findMany({
      skip: (pageValue - 1) * limitValue,
      take: limitValue,
      orderBy: {
        id: 'asc'
      }
    })
  }
}
