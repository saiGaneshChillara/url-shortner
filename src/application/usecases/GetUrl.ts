import { Url } from "../../domain/Url";
import { IUrlRepository } from "../interfaces/IUrlRepository";

export class GetUrl {
  constructor(private repository: IUrlRepository) {}

  async execute(code: string): Promise<Url | null> {
    const url = await this.repository.findByCode(code);
    if (!url) return null;

    await this.repository.incrementAccesCount(code);
    url.incrementAccessCount();
    return url;
  }
}