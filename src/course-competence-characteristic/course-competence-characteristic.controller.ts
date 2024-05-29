import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CourseCompetenceCharacteristicService } from './course-competence-characteristic.service';
import { ReqCreateCourseCompetenceCharacteristicDto } from './dto/req-create-course-competence-characteristic.dto';
import { ReqUpdateCourseCompetenceCharacteristicDto } from './dto/req-update-course-competence-characteristic.dto';
import { ResGetCourseCompetenceCharacteristicDto } from './dto/res-get-course-competence-characteristic.dto';

@ApiTags('CourseCompetenceCharacteristic')
@Controller('course-competence-characteristic')
export class CourseCompetenceCharacteristicController {
  constructor(
    private readonly courseCompetenceCharacteristicService: CourseCompetenceCharacteristicService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetCourseCompetenceCharacteristicDto})
  create(
    @Body()
    createCourseCompetenceCharacteristicDto: ReqCreateCourseCompetenceCharacteristicDto,
  ) {
    return this.courseCompetenceCharacteristicService.create(
      createCourseCompetenceCharacteristicDto,
    );
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  @ApiOkResponse({type: ResGetCourseCompetenceCharacteristicDto})
  update(
    @Param('id') id: string,
    @Body()
    updateCourseCompetenceCharacteristicDto: ReqUpdateCourseCompetenceCharacteristicDto,
  ) {
    return this.courseCompetenceCharacteristicService.update(
      id,
      updateCourseCompetenceCharacteristicDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COURSE_ORGANISER)
  remove(@Param('id') id: string) {
    return this.courseCompetenceCharacteristicService.remove(id);
  }
}
