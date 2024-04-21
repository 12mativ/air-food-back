import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pilot } from './entities/pilot.entity';

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

  async findAll(page: number, limit: number): Promise<{pilots: Pilot[]; pilotsTotalAmount: number}> {
    let pageValue = page;
    let limitValue = limit;
    if (!page) {
      pageValue = 1
    }

    if (!limit) {
      limitValue = 10
    }

    const pilotsTotalAmount = await this.prisma.pilot.count()
    
    const pilots = await this.prisma.pilot.findMany({
      skip: (pageValue - 1) * limitValue,
      take: limitValue,
      orderBy: {
        id: 'asc'
      },
    })

    const payload = {pilots: pilots, pilotsTotalAmount: pilotsTotalAmount}

    return payload;
  }
}
