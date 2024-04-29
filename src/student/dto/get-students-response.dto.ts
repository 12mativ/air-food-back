import { ApiProperty } from "@nestjs/swagger";
import { Student } from "../entities/student.entity";

export class GetStudentsResponseDto {
    @ApiProperty({
        isArray: true,
        type: Student,
    })
    students: Student[];
    
    @ApiProperty()
    studentsTotalAmount: number
}
