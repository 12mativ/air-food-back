import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/app.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
