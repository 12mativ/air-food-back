import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { Coach } from 'src/coach/entities/coach.entity';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    endDate?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    coachId?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    simulatorId?: string;
}
