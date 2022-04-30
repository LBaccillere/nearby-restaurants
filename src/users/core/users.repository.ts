import { UUID } from 'src/commons/types/uuid';
import { User } from './user.entity';

export interface UsersRepository {
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User>;
  findOne: (uuid: UUID) => Promise<User>;
  update: (user: User) => Promise<User>;
  remove: (uuid: UUID) => Promise<User>;
}
