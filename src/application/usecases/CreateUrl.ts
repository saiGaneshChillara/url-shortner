import { nanoid } from "nanoid";
import { IUrlRepository } from "../interfaces/IUrlRepository";
import { Url } from "../../domain/Url";

export class CreateUrl {
  constructor(private repository: IUrlRepository) {}

  async execute(url: string): Promise<Url> {
    if (!url) {
      throw new Error("URL is required");
    }

    const shortCode = nanoid(6);
    return this.repository.create(url, shortCode);
  }
}