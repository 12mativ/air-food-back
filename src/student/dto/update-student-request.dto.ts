import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateStudentRequestDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName?: string;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    birthDate?: string;
}
