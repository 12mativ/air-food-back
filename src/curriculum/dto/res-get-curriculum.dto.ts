import { ApiProperty } from "@nestjs/swagger"
import { ResGetEventDto } from "../../event/dto/res-get-event.dto"
import { IsString } from "class-validator"

export class ResGetCurriculumDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty({type: ResGetEventDto, isArray: true})
  events: ResGetEventDto[]
}