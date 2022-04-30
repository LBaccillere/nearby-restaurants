import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { CreateUserDto } from '../presentation/requests/createUser.dto';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from './users.repository';
import { EncryptService } from 'src/commons/services/encrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private userRepository: UsersRepository,
    private encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User(
      uuidv4(),
      createUserDto.name,
      createUserDto.email,
      await this.encryptService.encrypt(createUserDto.password),
      null,
      null,
      new Date(),
    );
    return this.userRepository.create(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOne(uuid: UUID): Promise<User> {
    const user = this.userRepository.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.userRepository.findByEmail(email);
    return user;
  }

  updateToken(uuid: UUID, token: string): Promise<User> {
    const user = this.userRepository.updateToken(uuid, token);
    return user;
  }
}
