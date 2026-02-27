import { Url } from "../../domain/Url";
import { IUrlRepository } from "../interfaces/IUrlRepository";

export class UpdateUrl {
  constructor(private repository: IUrlRepository) {}

  async execute(code: string, newUrl: string): Promise<Url | null> {
    if (!newUrl) {
      throw new Error("New URL is required");
    }

    return this.repository.update(code, newUrl);
  }
}