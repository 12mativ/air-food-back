import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { CompetenceCharacteristic } from "src/competence-characteristic/entities/competence-characteristic.entity";

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
    competences: CompetenceCharacteristic;

    @ApiProperty()
    @IsString()
    userId: string;
}
