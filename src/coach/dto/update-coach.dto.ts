import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateCoachDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    middleName?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    simulatorId?: string
}
