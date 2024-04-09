import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator"
import { Role } from "src/role/role.enum"

export class RegisterDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsArray()
  @ArrayNotEmpty()
  roles: Role[]
}