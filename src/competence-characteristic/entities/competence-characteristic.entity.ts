import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsOptional } from "class-validator";
import { Competence } from "src/competence/entities/competence.entity";
import { Course } from "src/course/entities/course.entity";
import { Student } from "src/student/entities/student.entity";

export class CompetenceCharacteristic {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    competenceId: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    courseId?: string;
    
    @ApiProperty({type: Competence})
    competence: Competence;

    @ApiProperty({type: Course})
    @IsOptional()
    course?: Course;

    @ApiProperty({type: Student})
    @IsOptional()
    student?: Student;

    @ApiProperty()
    @IsString()
    studentId: string;
}
