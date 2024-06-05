import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentCompetenceCharacteristicService } from './student-competence-characteristic.service';
import { ReqCreateStudentCompetenceCharacteristicDto } from './dto/req-create-student-competence-characteristic.dto';
import { ReqUpdateStudentCompetenceCharacteristicDto } from './dto/req-update-student-competence-characteristic.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../role/role.enum';
import { ResGetStudentCompetenceCharacteristicDto } from './dto/res-get-student-competence-characteristic.dto';

@ApiTags('StudentCompetenceCharacteristic')
@Controller('student-competence-characteristic')
export class StudentCompetenceCharacteristicController {
  constructor(
    private readonly studentCompetenceCharacteristicService: StudentCompetenceCharacteristicService,
  ) {}

  @Post()
  @ApiOkResponse({ type: ResGetStudentCompetenceCharacteristicDto })
  @Roles(Role.ADMIN)
  create(
    @Body()
    createStudentCompetenceCharacteristicDto: ReqCreateStudentCompetenceCharacteristicDto,
  ) {
    return this.studentCompetenceCharacteristicService.create(
      createStudentCompetenceCharacteristicDto,
    );
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: ResGetStudentCompetenceCharacteristicDto })
  update(
    @Param('id') id: string,
    @Body()
    updateStudentCompetenceCharacteristicDto: ReqUpdateStudentCompetenceCharacteristicDto,
  ) {
    return this.studentCompetenceCharacteristicService.update(
      id,
      updateStudentCompetenceCharacteristicDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.studentCompetenceCharacteristicService.remove(id);
  }
}
