export class Place {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  getName = (): string => this.#name;
}
