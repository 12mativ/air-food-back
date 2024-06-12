import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSimulatorDto {
    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsString()
    eventId: string;
}
