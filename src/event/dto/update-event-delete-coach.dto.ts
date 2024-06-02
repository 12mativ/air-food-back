import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEventDeleteCoachDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    idCoach?: string;
}
