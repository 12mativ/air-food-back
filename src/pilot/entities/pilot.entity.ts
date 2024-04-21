import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class Pilot {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    firstName: string;
    
    @ApiProperty()
    @IsString()
    lastName: string;
    
    @ApiProperty()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsString()
    userId: string;
}
