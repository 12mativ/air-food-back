import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/role/role.enum';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async isUserExistInDB(email: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  async register(registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const {email, password, roles} = registerDto
    
    const foundUser = await this.isUserExistInDB(email);

    if (foundUser) {
      throw new BadRequestException('Пользователь с таким email уже зарегистрирован')
    }

    const student = roles.includes(Role.STUDENT)
      ? {
        create: {
          email: email
        }
      }
      : {}

    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        roles: roles,
        student: student
      }
    })

    const payload = { sub: newUser.id, email: newUser.email, roles: newUser.roles };

    return {
      jwt: await this.jwtService.signAsync(payload)
    }
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const {email, password} = loginDto
    
    const user = await this.prisma.user.findFirst({
      where: { email }
    })

    if (!user) {
      throw new BadRequestException("Неверный логин или пароль")
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new BadRequestException("Неверный логин или пароль");
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };

    return {
      jwt: await this.jwtService.signAsync(payload)
    }
  }
}
