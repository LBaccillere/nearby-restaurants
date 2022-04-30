import { UUID } from 'src/commons/types/uuid';
import { User } from 'src/users/core/user.entity';

export class HistorySearch {
  #uuid: UUID;
  #user: User;
  #query: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(
    uuid: UUID,
    user: User,
    query: string,
    createdAt: Date,
    updatedAt: Date | null = null,
  ) {
    this.#uuid = uuid;
    this.#user = user;
    this.#query = query;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  getUuid = (): UUID => this.#uuid;

  getUser = (): User => this.#user;

  getQuery = (): string => this.#query;

  getCreatedAt = (): Date => this.#createdAt;

  getUpdatedAt = (): Date | null => this.#updatedAt;
}
