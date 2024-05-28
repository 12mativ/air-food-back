import { ApiProperty } from "@nestjs/swagger";

export class LimitRequestDto {
    @ApiProperty({default: 10, required: false})
    limit: number
}