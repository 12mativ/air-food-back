import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/app.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({type: LoginResponseDto})
  @Public()
  login(@Body(new ValidationPipe()) loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOkResponse({type: RegisterResponseDto})
  @Public()
  register(@Body(new ValidationPipe()) registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }
}
