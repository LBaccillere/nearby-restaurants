import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/core/users.service';
import { CreateUserDto } from 'src/users/presentation/requests/createUser.dto';
import { EncryptService } from '../../commons/services/encrypt.service';
import { JWTPayload } from '../jwtPayload';
import { LoginDto } from '../presentation/requests/login.dto';
import { RegisterDto } from '../presentation/requests/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      if (
        user &&
        this.encryptService.compareEncrypted(
          user.getPassword(),
          loginDto.password,
        )
      ) {
        return this.generateAccessToken(loginDto.email);
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async registerUser(registerDto: RegisterDto): Promise<any> {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already registered',
        },
        HttpStatus.CONFLICT,
      );
    }
    const createUserDto: CreateUserDto = {
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    };
    const user = await this.usersService.create(createUserDto);
    if (
      user &&
      this.encryptService.compareEncrypted(
        user.getPassword(),
        registerDto.password,
      )
    ) {
      return this.generateAccessToken(registerDto.email);
    }
    return null;
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.findByEmail(email);
    const payload: JWTPayload = { uuid: user.getUuid() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
