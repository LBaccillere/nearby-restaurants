import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../core/auth.service';
import { LoginDto } from './requests/login.dto';
import { RegisterDto } from './requests/register.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('auth/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.registerUser(registerDto);
  }
}
