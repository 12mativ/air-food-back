import { ApiProperty } from "@nestjs/swagger";

export class PageRequestDto {
    @ApiProperty({default: 1, required: false})
    page: number
}