import { ApiProperty } from "@nestjs/swagger";
import { ResGetStudentDto } from "./res-get-student.dto";

export class GetStudentsResponseDto {
    @ApiProperty({type: ResGetStudentDto, isArray: true})
    students: ResGetStudentDto[];
    
    @ApiProperty()
    studentsTotalAmount: number
}