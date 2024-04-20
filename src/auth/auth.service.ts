import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/role/role.enum';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async isUserExistInDB(username: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        username
      }
    })
  }

  async getAllUsers() {
    return this.prisma.user.findMany()
  }

  async register(registerDto: RegisterDto) {
    const foundUser = await this.isUserExistInDB(registerDto.username);

    if (foundUser) {
      throw new BadRequestException('Пользователь с таким email уже зарегистрирован')
    }

    const pilot = registerDto.roles.includes(Role.PILOT)
      ? {
        create: {
          username: registerDto.username
        }
      }
      : {}

    const newUser = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        password: await bcrypt.hash(registerDto.password, 10),
        roles: registerDto.roles,
        pilot: pilot
      }
    })

    const payload = { sub: newUser.id, username: newUser.username, roles: newUser.roles };

    return {
      jwt: await this.jwtService.signAsync(payload)
    }
  }

  async login(username: string, pass: string) {
    const user = await this.prisma.user.findFirst({
      where: { username }
    })

    if (!user) {
      throw new BadRequestException("Неверный логин или пароль")
    }

    const isPasswordEqual = await bcrypt.compare(pass, user.password);

    if (!isPasswordEqual) {
      throw new BadRequestException("Неверный логин или пароль");
    }

    const payload = { sub: user.id, username: user.username, roles: user.roles };

    return {
      jwt: await this.jwtService.signAsync(payload)
    }
  }
}
