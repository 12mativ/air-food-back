import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisterResponseDto {
    @ApiProperty()
    @IsString()
    jwt: string
}