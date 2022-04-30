import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from 'src/commons/services/encrypt.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from '../core/auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { AuthController } from '../presentation/auth.controller';

describe('Auth', () => {
  let authcontroller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, EncryptService],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    authcontroller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('controller should be defined', () => {
    expect(authcontroller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(authService).toBeDefined();
  });
});
