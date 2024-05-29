import { ApiProperty } from "@nestjs/swagger";
import { StudentCompetenceCharacteristic } from "@prisma/client";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class Student {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;
    
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    birthDate: string;

    @ApiProperty()
    competences: StudentCompetenceCharacteristic[];

    @ApiProperty()
    @IsString()
    userId: string;
}
