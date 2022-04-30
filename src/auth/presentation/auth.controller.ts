import { Controller, Post, Body, Query } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { AuthService } from '../core/auth.service';
import { LoginDto } from './requests/login.dto';
import { RegisterDto } from './requests/register.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(registerDto);
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('auth/logout')
  async logout(@Query('uuid') uuid: UUID): Promise<{ message: string }> {
    return this.authService.logout(uuid);
  }
}
