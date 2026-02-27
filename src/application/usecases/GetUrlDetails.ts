import { Url } from "../../domain/Url";
import { IUrlRepository } from "../interfaces/IUrlRepository";

export class GetUrlDetails {
  constructor(private repository: IUrlRepository) {}

  async execute(code: string): Promise<Url | null> {
    return this.repository.findByCode(code);
  }
}