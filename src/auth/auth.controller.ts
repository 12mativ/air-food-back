import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import { Public } from 'src/app.decorator';
import { RegisterDto } from './dto/registerDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  login(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('users')
  @Public()
  getUsers(@Request() req) {
    return this.authService.getAllUsers()
  }
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
