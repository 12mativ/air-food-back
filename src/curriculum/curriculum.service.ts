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
    const student = await this.prisma.student.findFirst({
      where: {
        id: createCurriculumDto.studentId
      },
      include: {
        expectingCompetencies: {
          include: {
            competence: true
          }
        },
        competencies: {
          include: {
            competence: true
          }
        }
      }
    })

    const {competencies, expectingCompetencies} = student

    let expectedCompetenciesIds = student.expectingCompetencies.map(
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
            competencies.find(
              (cc) => cc.competenceId === ic.competenceId,
            );
          const expectedCompetency =
            expectingCompetencies.find(
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
    let currentCompetencies = [...competencies];

    while (expectedCompetenciesIds.length > 0) {
      let bestCourse = null;
      let bestImprovement = 0;

      // Найти курс, который дает наибольшее улучшение компетенций
      secondStageCoursesCandidates.forEach((course) => {
        let totalImprovement = 0;

        // Рассчитать общую пользу от улучшения компетенций для данного курса
        course.improvingCompetencies.forEach((ic) => {
          const currentCompetency = currentCompetencies.find(
            (cc) => cc.competenceId === ic.competenceId,
          );
          const expectedCompetency =
            expectingCompetencies.find(
              (ec) => ec.competenceId === ic.competenceId,
            );
          if (currentCompetency && expectedCompetency) {
            // Вычислить улучшение, которое дает данный курс для данной компетенции
            const improvement = Math.min(
              expectedCompetency.scaleValue - currentCompetency.scaleValue,
              ic.improvingValue,
            );
            if (improvement > 0) {
              totalImprovement += improvement;
            }
          }
        });

        // Сравнить с наилучшим найденным улучшением и обновить, если текущий курс лучше
        if (totalImprovement > bestImprovement) {
          bestImprovement = totalImprovement;
          bestCourse = course;
        }
      });

      if (bestCourse) {
        // Добавить лучший курс в список выбранных курсов
        selectedCourses.push(bestCourse);
        secondStageCoursesCandidates.splice(
          secondStageCoursesCandidates.indexOf(bestCourse),
          1,
        );
        // Обновить текущие компетенции студента на основе выбранного курса
        bestCourse.improvingCompetencies.forEach((ic) => {
          const currentCompetency = currentCompetencies.find(
            (cc) => cc.competenceId === ic.competenceId,
          );
          if (currentCompetency) {
            currentCompetency.scaleValue = Math.min(
              currentCompetency.scaleValue + ic.improvingValue,
              expectingCompetencies.find(
                (ec) => ec.competenceId === ic.competenceId,
              ).scaleValue,
            );
          }
        });

        // Обновить список компетенций, которые еще не достигли нужного уровня
        expectedCompetenciesIds = expectingCompetencies
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

    const eventIds = selectedCourses.flatMap(course => course.events.map(event => event.id));
    await this.prisma.event.deleteMany({
      where: {
        id: { in: eventIds }
      }
    });

    // Добавить мероприятия выбранных курсов в существующий учебный план
    await this.prisma.event.createMany({
      data: selectedCourses.flatMap(course => course.events.map(event => ({
        id: event.id,
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        courseId: event.courseId,
        curriculumId: createCurriculumDto.curriculumId
      })))
    });

    const curriculum = await this.prisma.curriculum.findFirst({
      where: {
        id: createCurriculumDto.curriculumId
      },
      include: {
        cirriculumEvents: true
      }
    })

    return curriculum;
    // const curriculum = await this.prisma.curriculum.update({
    //   where: {
    //     id: createCurriculumDto.curriculumId
    //   },
    //   data: {
    //     cirriculumEvents: {
    //       create: selectedCourses.flatMap(course => course.events.map(event => ({
    //         id: event.id,
    //         name: event.name,
    //         startDate: event.startDate,
    //         endDate: event.endDate,
    //         courseId: event.courseId
    //       })))
    //     }
    //   },
    //   include: {
    //     cirriculumEvents: true
    //   }
    // })
    // await this.prisma.curriculum.create({
    //   data: {
    //     cirriculumEvents: {
    //       createMany: {
    //         data: finalEvents.map((fe) => {
              
    //         })
    //       }
    //     }
    //   }
    // })
    // await this.prisma.student.update({
    //   where: {
    //     id: studentId
    //   },
    //   data: {
    //     curriculum: {
    //       connect: {
    //         id: 
    //       }
    //     }
    //   }
    // })


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
