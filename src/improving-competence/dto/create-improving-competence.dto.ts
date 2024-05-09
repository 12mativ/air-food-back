import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateImprovingCompetenceDto {
    @ApiProperty()
    @IsNumber()
    improvingValue: number;

    @ApiProperty()
    @IsString()
    competenceId: string
}