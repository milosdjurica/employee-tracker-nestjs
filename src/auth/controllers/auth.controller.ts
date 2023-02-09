import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dto';
import { Tokens } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register')
  register(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.register(dto);
  }


  @Post('login')
  login(@Body() dto: LoginDto) {
    this.authService.login(dto);
  }

  @Post('logOut')
  logOut() {
    this.authService.logOut();
  }

  @Post('refresh')
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
