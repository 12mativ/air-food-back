import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class Pilot {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    firstName: string;
    
    @ApiProperty()
    @IsString()
    lastName: string;
    
    @ApiProperty()
    @IsString()
    birthDate: string;

    @ApiProperty()
    @IsString()
    userId: string;
}
