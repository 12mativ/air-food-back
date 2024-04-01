import { IsDateString, IsString, IsUUID } from "class-validator";

export class CreateFlightDto {
  @IsString()
  startCity: string;
  @IsString()
  endCity: string;
  @IsDateString()
  startDate: string;
  @IsDateString()
  endDate: string;
  @IsUUID()
  airplaneId: string;
}
