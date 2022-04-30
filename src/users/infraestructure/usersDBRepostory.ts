import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { User } from '../core/user.entity';
import { UsersRepository } from '../core/users.repository';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/commons/infraestructure/db/prisma/prisma.service';

@Injectable()
export class UsersDBRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const record = await this.prisma.user.create({
      data: {
        uuid: user.getUuid(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        refreshToken: user.getRefreshToken(),
        createdAt: user.getCreatedAt(),
      },
    });
    return this.#mapToModel(record);
  }

  async findAll(): Promise<User[]> {
    const records = await this.prisma.user.findMany({
      orderBy: [{ name: 'asc' }],
    });
    return records.map((r) => this.#mapToModel(r));
  }

  async findOne(uuid: UUID): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });
    if (!record) {
      throw new NotFoundException();
    }
    return this.#mapToModel(record);
  }

  async findByEmail(email: string): Promise<User> {
    const where = {
      email,
    };
    const records = await this.prisma.user.findMany({
      where,
    });
    if (isEmpty(records)) {
      throw new NotFoundException();
    }
    return this.#mapToModel(records[0]);
  }

  async update(user: User): Promise<User> {
    const record = await this.prisma.user.update({
      where: {
        uuid: user.getUuid(),
      },
      data: {
        uuid: user.getUuid(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
      },
    });
    return this.#mapToModel(record);
  }

  async remove(uuid: UUID): Promise<User> {
    const record = await this.prisma.user.delete({
      where: {
        uuid,
      },
    });
    return this.#mapToModel(record);
  }

  #mapToModel = (userRecord: any): User => {
    return new User(
      userRecord.uuid,
      userRecord.name,
      userRecord.email,
      userRecord.password,
      userRecord.refreshToken,
      userRecord.createdAt,
      userRecord.updatedAt,
    );
  };
}
