import { IsNumber, IsString } from "class-validator"

export class CreateAirplaneDto {
  @IsString()
  airplaneName: string
  @IsNumber()
  capacity: number
}
