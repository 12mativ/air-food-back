import { ArrayNotEmpty, IsArray, IsEnum, IsString } from "class-validator"
import { Role } from "src/role/role.enum"

export class RegisterDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, {each: true, message: "Недопустимое значение роли, доступные значения: PILOT, COURSE_ORGANISER"})
  roles: Role[]
}