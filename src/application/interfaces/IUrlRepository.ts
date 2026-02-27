import { Url } from "../../domain/Url";

export interface IUrlRepository {
  create(url: string, shortCode: string): Promise<Url>;
  findByCode(code: string): Promise<Url | null>;
  update(code: string, newUrl: string): Promise<Url | null>;
  delete(code: string): Promise<boolean>;
  incrementAccesCount(code: string): Promise<void>;
}