import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { UsersService } from 'src/users/core/users.service';
import { UserResponse, mapToResponse } from './responses/user.response';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  UsersResponse,
  mapToResponse as mapToPaginatedResponse,
} from './responses/users.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersResponse> {
    return mapToPaginatedResponse(await this.usersService.findAll());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: UUID): Promise<UserResponse> {
    return mapToResponse(await this.usersService.findOne(uuid));
  }
}
