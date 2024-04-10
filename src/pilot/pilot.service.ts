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

  async findAll() {
    return await this.prisma.pilot.findMany()
  }
}
