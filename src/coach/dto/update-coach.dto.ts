import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateCoachDto {
    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsString()
    firstName?: string

    @ApiProperty()
    @IsString()
    middleName?: string

    @ApiProperty()
    @IsString()
    lastName?: string
}
