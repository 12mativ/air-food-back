import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResGetSimulatorDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;
}
