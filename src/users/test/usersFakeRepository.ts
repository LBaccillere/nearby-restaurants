import { Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { User } from '../core/user.entity';
import { UsersRepository } from '../core/users.repository';

@Injectable()
export class UsersFakeRepository implements UsersRepository {
  #users: User[] = [];

  async create(user: User): Promise<User> {
    this.#users.push(user);
    return Promise.resolve(user);
  }

  async findAll(): Promise<User[]> {
    return this.#users;
  }

  async findOne(uuid: UUID): Promise<User> {
    const user: User = this.#users.find((user) => user.getUuid() === uuid);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = this.#users.find((user) => user.getEmail() === email);
    return user;
  }

  async updateToken(uuid: UUID, token: string): Promise<User> {
    const user: User = this.#users.find((user) => user.getUuid() === uuid);
    return Object.assign(user, { token });
  }
}
