import { ApiProperty } from "@nestjs/swagger";
import { Student } from "../entities/student.entity";

export class GetStudentsResponseDto {
    @ApiProperty()
    students: Student[];
    
    @ApiProperty()
    studentsTotalAmount: number
}
