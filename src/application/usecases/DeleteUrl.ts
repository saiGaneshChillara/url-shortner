import { IUrlRepository } from "../interfaces/IUrlRepository";

export class DeleteUrl {
  constructor(private repository: IUrlRepository) {}

  async execute(code: string): Promise<boolean> {
    return this.repository.delete(code);
  }
}