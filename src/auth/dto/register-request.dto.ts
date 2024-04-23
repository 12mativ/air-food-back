import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsString, Length, Min } from "class-validator"
import { Role } from "src/role/role.enum"

export class RegisterRequestDto {
  @ApiProperty()
  @IsString({message: "Значение email отсутствует"})
  @IsEmail({}, {message: "Недопустимый формат email"})
  email: string

  @ApiProperty()
  @IsString({message: "Значение пароля отсутствует"})
  @Length(8, 20, {message: "Длина пароля должна быть больше 8 и меньше 20 символов"})
  password: string
  
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, {each: true, message: "Недопустимое значение роли, доступные значения: PILOT, COURSE_ORGANISER"})
  roles: Role[]
}