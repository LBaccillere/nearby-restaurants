import { Module } from '@nestjs/common';
import { PrismaService } from 'src/commons/infraestructure/db/prisma/prisma.service';
import { EncryptService } from 'src/commons/services/encrypt.service';
import { UsersController } from 'src/users/presentation/users.controller';
import { UsersService } from './core/users.service';
import { UsersDBRepository } from './infraestructure/usersDBRepostory';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersDBRepository,
    },
    UsersService,
    PrismaService,
    EncryptService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
