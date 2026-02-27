import { Pool } from "pg";
import { IUrlRepository } from "../../application/interfaces/IUrlRepository";
import { Url } from "../../domain/Url";

export class PostgresUrlRepository implements IUrlRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }
  async create(url: string, shortCode: string): Promise<Url> {
    const result = await this.pool.query(
      `INSERT INTO urls (url, short_code) VALUES ($1, $2) RETURNING *`,
      [url, shortCode]
    );

    const row = result.rows[0];

    return new Url(
      row.id,
      row.url,
      row.short_code,
      row.access_count,
      row.created_at,
      row.updated_at
    );
  }
  async findByCode(code: string): Promise<Url | null> {
    const result = await this.pool.query(
      `SELECT * FROM urls WHERE short_code = $1`,
      [code]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];

    return new Url(
      row.id,
      row.url,
      row.short_code,
      row.access_count,
      row.created_at,
      row.updated_at,
    );
  }
  async update(code: string, newUrl: string): Promise<Url | null> {
    const result = await this.pool.query(
      `UPDATE urls SET url = $1 WHERE short_code = $2 RETURNING *`,
      [newUrl, code]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];

    return new Url(
      row.id,
      row.url,
      row.short_code,
      row.access_count,
      row.created_at,
      row.updated_at,
    );
  }
  async delete(code: string): Promise<boolean> {
    const result = await this.pool.query(
      `DELETE FROM urls WHERE short_code = $1`,
      [code]
    );

    return result.rowCount! > 0;
  }
  async incrementAccesCount(code: string): Promise<void> {
    await this.pool.query(
      `UPDATE urls SET access_count = access_count + 1 WHERE short_code = $1`,
      [code]
    );
  }
  
}