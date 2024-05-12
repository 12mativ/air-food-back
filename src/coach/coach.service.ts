import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coaches = await this.prisma.coach.findMany({
      include: {
        events: true
      }
    });
    return coaches;
  }

  async findOne(id: string) {
    const coach = await this.prisma.coach.findFirst({
      where: {
        id
      }
    })
    return coach;
  }

  async update(id: string, updateCoachDto: UpdateCoachDto) {
    const {email, firstName, lastName, middleName} = updateCoachDto
    const updatedCoach = await this.prisma.coach.update({
      where: {
        id
      },
      data: {
        email, 
        firstName, 
        lastName, 
        middleName
      }
    })
    return updatedCoach;
  }

  remove(id: number) {
    return `This action removes a #${id} coach`;
  }
}
