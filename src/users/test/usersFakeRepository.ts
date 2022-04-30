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

  async update(user: User): Promise<User> {
    const record: User = this.#users.find(
      (obj: User) => obj.getUuid() === user.getUuid(),
    );
    return Object.assign(record, user);
  }

  async remove(uuid: UUID): Promise<User> {
    const record = this.#users.find((obj: User) => obj.getUuid() === uuid);
    const position = this.#users.findIndex((user) => user.getUuid() === uuid);
    this.#users.splice(position, 1);
    return record;
  }
}
