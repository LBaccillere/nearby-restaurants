import { UUID } from 'src/commons/types/uuid';

export class User {
  #uuid: UUID;
  #name: string;
  #email: string;
  #password: string;
  #token: string;
  #refreshToken: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(
    uuid: UUID,
    name: string,
    email: string,
    password: string,
    token: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date | null = null,
  ) {
    this.#uuid = uuid;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#token = token;
    this.#refreshToken = refreshToken;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  getUuid = (): UUID => this.#uuid;

  getName = (): string => this.#name;

  getEmail = (): string => this.#email;

  getPassword = (): string => this.#password;

  getToken = (): string => this.#token;

  getRefreshToken = (): string => this.#refreshToken;

  getCreatedAt = (): Date => this.#createdAt;

  getUpdatedAt = (): Date | null => this.#updatedAt;
}
