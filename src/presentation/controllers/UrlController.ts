import { Request, Response } from "express";
import { CreateUrl } from "../../application/usecases/CreateUrl";
import { GetUrl } from "../../application/usecases/GetUrl";
import { UpdateUrl } from "../../application/usecases/UpdateUrl";
import { DeleteUrl } from "../../application/usecases/DeleteUrl";
import { GetUrlDetails } from "../../application/usecases/GetUrlDetails";
import { error } from "node:console";
import { accessSync } from "node:fs";

interface Params {
  code: string;
}

export class UrlController {
  constructor(
    private getUrl: GetUrl, 
    private createUrl: CreateUrl,
    private updateUrl: UpdateUrl,
    private deleteUrl: DeleteUrl,
    private getUrlDetails: GetUrlDetails,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { url } = req.body;

      const result = await this.createUrl.execute(url);
      res.status(201).json({
        shortCode: result.shortCode,
        url: result.url,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });    
    }
  }

  async redirect(req: Request<Params>, res: Response) {
    try {
      const { code } = req.params;

      const result = await this.getUrl.execute(code);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.redirect(result.url);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request<Params>, res: Response) {
    try {
      const { code } = req.params;
      const deleted = await this.deleteUrl.execute(code);

      if (!deleted) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request<Params>, res: Response) {
    try {
      const { code } = req.params;
      const { url } = req.body;

      const result = await this.updateUrl.execute(code, url);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.json({
        shortCode: result.shortCode,
        url: result.url,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async details(req: Request<Params>, res: Response) {
    try {
      const { code } = req.params;

      const result = await this.getUrlDetails.execute(code);
      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.json({
        shortCode: result.shortCode,
        url: result.url,
        accessCount: result.accessCount,
        createdAt: result.createdAt,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}