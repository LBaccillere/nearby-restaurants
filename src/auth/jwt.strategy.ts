import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { JWTPayload } from './jwtPayload';
import { UsersService } from 'src/users/core/users.service';
import {
  mapToResponse,
  UserResponse,
} from 'src/users/presentation/responses/user.response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<UserResponse> {
    const user = await this.userService.findOne(payload.uuid);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.getToken()) {
      throw new UnauthorizedException();
    }
    return mapToResponse(user);
  }
}
