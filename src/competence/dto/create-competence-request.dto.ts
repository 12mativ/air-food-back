import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompetenceDto {
    @IsString()
    @ApiProperty()
    name: string;
}
