import { Type } from "class-transformer";
import { ReqCreateStudentCompetenceCharacteristicDto } from "../../student-competence-characteristic/dto/req-create-student-competence-characteristic.dto";
import { ReqUpdateTimesDto } from "../../student/dto/req-update-times.dto";
import { IsArray, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCurriculumDto {
  @ApiProperty({ type: ReqCreateStudentCompetenceCharacteristicDto, isArray: true })
  @IsArray()
  expectedCompetencies: ReqCreateStudentCompetenceCharacteristicDto[]
  
  @ApiProperty({ type: ReqUpdateTimesDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => ReqUpdateTimesDto)
  schedule: ReqUpdateTimesDto[]
}
