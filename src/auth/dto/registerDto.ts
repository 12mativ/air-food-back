import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsEnum, IsString } from "class-validator"
import { Role } from "src/role/role.enum"

export class RegisterDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  password: string
  
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, {each: true, message: "Недопустимое значение роли, доступные значения: PILOT, COURSE_ORGANISER"})
  roles: Role[]
}