import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'src/commons/types/uuid';
import { UsersService } from 'src/users/core/users.service';
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
        const { access_token } = await this.generateAccessToken(user.getUuid());
        await this.usersService.updateToken(user.getUuid(), access_token);
        return { access_token };
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async register(registerDto: RegisterDto): Promise<any> {
    let userExists;
    try {
      userExists = await this.usersService.findByEmail(registerDto.email);
    } catch (e) {}

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already registered',
        },
        HttpStatus.CONFLICT,
      );
    }

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    });
    const { access_token } = await this.generateAccessToken(user.getUuid());
    await this.usersService.updateToken(user.getUuid(), access_token);

    return { access_token };
  }

  async logout(uuid: UUID): Promise<any> {
    await this.usersService.updateToken(uuid, null);
    return { message: 'log out is ok' };
  }

  async generateAccessToken(uuid: UUID) {
    const payload: JWTPayload = { uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
