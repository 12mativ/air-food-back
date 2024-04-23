import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

// export class UpdatePilotDto extends PartialType(Pilot) {}

export class UpdatePilotRequestDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName?: string;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    birthDate?: string;
}
