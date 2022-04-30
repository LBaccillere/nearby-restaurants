import { UUID } from 'src/commons/types/uuid';

export class User {
  #uuid: UUID;
  #name: string;
  #email: string;
  #password: string;
  #refreshToken: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(
    uuid: UUID,
    name: string,
    email: string,
    password: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date | null = null,
  ) {
    this.#uuid = uuid;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#refreshToken = refreshToken;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  getUuid = (): UUID => this.#uuid;

  getName = (): string => this.#name;

  getEmail = (): string => this.#email;

  getPassword = (): string => this.#password;

  getRefreshToken = (): string => this.#refreshToken || '';

  getCreatedAt = (): Date => this.#createdAt;

  getUpdatedAt = (): Date | null => this.#updatedAt;
}
