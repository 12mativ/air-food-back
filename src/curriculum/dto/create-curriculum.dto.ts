import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { ReqUpdateTimesDto } from "../../student/dto/req-update-times.dto";
import { Type } from "class-transformer";

export class CreateCurriculumDto {  
  @ApiProperty({ type: ReqUpdateTimesDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => ReqUpdateTimesDto)
  schedule: ReqUpdateTimesDto[]

  @ApiProperty()
  @IsString()
  studentId: string

  @ApiProperty()
  @IsString()
  curriculumId: string
}