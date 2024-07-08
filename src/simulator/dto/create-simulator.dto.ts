import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateSimulatorDto {
    @IsString()
    @MinLength(1, {message: "Имя тренажера должно содержать хотя бы один символ"})
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsString()
    courseId: string;
}
