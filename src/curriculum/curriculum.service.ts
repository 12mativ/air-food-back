import { Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ReqUpdateTimesDto } from '../student/dto/req-update-times.dto';
import { ResGetEventDto } from '../event/dto/res-get-event.dto';

@Injectable()
export class CurriculumService {
  constructor(private readonly prisma: PrismaService) {}

  // Преобразовать расписание человека в более удобный формат
  convertSchedule(schedule: ReqUpdateTimesDto[]) {
    const result = {};
    schedule.forEach((daySchedule) => {
      result[daySchedule.day] = daySchedule.time;
    });
    return result;
  }

  timeOverlap(eventStart: Date, eventEnd: Date, scheduleTime) {
    const eventStartTime = new Date(eventStart).getHours();
    const eventEndTime = new Date(eventEnd).getHours();

    return scheduleTime.some(({ startTime, endTime }) => {
      return eventStartTime >= startTime && eventEndTime <= endTime;
    });
  }

  canAttendCourse(userSchedule, course) {
    let totalEvents = 0;
    let attendedEvents = 0;

    course.events.forEach((event) => {
      totalEvents++;
      const eventDay = new Date(event.startDate)
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();
      if (
        userSchedule[eventDay] &&
        this.timeOverlap(event.startDate, event.endDate, userSchedule[eventDay])
      ) {
        attendedEvents++;
      }
    });

    return attendedEvents / totalEvents >= 0.9;
  }

  findElByIdInArray(id: string, arr: any[]) {
    return arr.find((el) => el.id === id);
  }

  async create(createCurriculumDto: CreateCurriculumDto) {
    let expectedCompetenciesIds = createCurriculumDto.expectedCompetencies.map(
      (ec) => ec.competenceId,
    );
    let firstStageCoursesCandidates = [];
    // поиск всех курсов которые прокачивают нужные нам компетнеции
    const courses = await this.prisma.course.findMany({
      where: {
        improvingCompetencies: {
          some: {
            competenceId: { in: expectedCompetenciesIds },
          },
        },
      },
      include: {
        improvingCompetencies: true,
        events: true,
      },
    });

    // поиск курсов которые достаточно прокачивают нужные нам компетенции
    courses.forEach((c) => {
      c.improvingCompetencies.forEach((ic) => {
        if (expectedCompetenciesIds.includes(ic.competenceId)) {
          const currentCompetency =
            createCurriculumDto.currentCompetencies.find(
              (cc) => cc.competenceId === ic.competenceId,
            );
          const expectedCompetency =
            createCurriculumDto.expectedCompetencies.find(
              (ec) => ec.competenceId === ic.competenceId,
            );
          if (
            ic.improvingValue + currentCompetency.scaleValue >=
            expectedCompetency.scaleValue
          ) {
            if (!this.findElByIdInArray(c.id, firstStageCoursesCandidates)) {
              firstStageCoursesCandidates.push(c);
            }
          }
        }
      });
    });

    console.log(
      '~~~~~~~~~~~~~~~~',
      firstStageCoursesCandidates,
      '~~~~~~~~~~~~~~~~',
    );
    const convertedSchedule = this.convertSchedule(
      createCurriculumDto.schedule,
    );
    const secondStageCoursesCandidates = firstStageCoursesCandidates.filter(
      (course) => this.canAttendCourse(convertedSchedule, course),
    );
    console.log(
      '================',
      secondStageCoursesCandidates,
      '===============',
    );

    // Жадный алгоритм для минимизации количества курсов
    let selectedCourses = [];
    let currentCompetencies = [...createCurriculumDto.currentCompetencies];

    while (expectedCompetenciesIds.length > 0) {
      let bestCourse = null;
      let bestImprovement = 0;

      secondStageCoursesCandidates.forEach((course) => {
        let totalImprovement = 0;

        course.improvingCompetencies.forEach((ic) => {
          const currentCompetency = currentCompetencies.find(
            (cc) => cc.competenceId === ic.competenceId,
          );
          const expectedCompetency =
            createCurriculumDto.expectedCompetencies.find(
              (ec) => ec.competenceId === ic.competenceId,
            );
          if (currentCompetency && expectedCompetency) {
            const improvement = Math.min(
              expectedCompetency.scaleValue - currentCompetency.scaleValue,
              ic.improvingValue,
            );
            if (improvement > 0) {
              totalImprovement += improvement;
            }
          }
        });

        if (totalImprovement > bestImprovement) {
          bestImprovement = totalImprovement;
          bestCourse = course;
        }
      });

      if (bestCourse) {
        selectedCourses.push(bestCourse);
        secondStageCoursesCandidates.splice(
          secondStageCoursesCandidates.indexOf(bestCourse),
          1,
        );
        bestCourse.improvingCompetencies.forEach((ic) => {
          const currentCompetency = currentCompetencies.find(
            (cc) => cc.competenceId === ic.competenceId,
          );
          if (currentCompetency) {
            currentCompetency.scaleValue = Math.min(
              currentCompetency.scaleValue + ic.improvingValue,
              createCurriculumDto.expectedCompetencies.find(
                (ec) => ec.competenceId === ic.competenceId,
              ).scaleValue,
            );
          }
        });

        expectedCompetenciesIds = createCurriculumDto.expectedCompetencies
          .filter(
            (ec) =>
              currentCompetencies.find(
                (cc) => cc.competenceId === ec.competenceId,
              ).scaleValue < ec.scaleValue,
          )
          .map((ec) => ec.competenceId);
      } else {
        // Если больше нет подходящих курсов для улучшения компетенций
        break;
      }
    }

    console.log('Selected courses: ', selectedCourses);

    const finalEvents: ResGetEventDto[] = []
    selectedCourses.forEach(sc => {
      finalEvents.push(...sc.events)
    })
    const studentId = createCurriculumDto.currentCompetencies[0].studentId;
    await this.prisma.curriculum.create({
      data: {
        cirriculumEvents: {
          createMany: {
            data: finalEvents.map((fe) => {
              
            })
          }
        }
      }
    })
    await this.prisma.student.update({
      where: {
        id: studentId
      },
      data: {
        curriculum: {
          connect: {
            id: 
          }
        }
      }
    })

    return finalEvents;
  }

  findOne(id: number) {
    return `This action returns a #${id} curriculum`;
  }

  update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    return `This action updates a #${id} curriculum`;
  }

  remove(id: number) {
    return `This action removes a #${id} curriculum`;
  }
}
