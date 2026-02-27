import mongoose, { model, Schema } from "mongoose";
import { IUrlRepository } from "../../application/interfaces/IUrlRepository";
import { Url } from "../../domain/Url";

const UrlSchema = new Schema(
  {
    url: {
      type: String, 
      required: true,
    },
    shortCode: {
      type: String, 
      required: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UrlModel = model("Url", UrlSchema);

export class MongoUrlRepository implements IUrlRepository {
  async findByCode(code: string): Promise<Url | null> {
    const doc = await UrlModel.findOne({ shortCode: code });
    if (!doc) return null;

    return new Url(
      doc._id.toString(),
      doc.url,
      doc.shortCode,
      doc.accessCount,
      doc.createdAt,
      doc.updatedAt
    );
  }
  async update(code: string, newUrl: string): Promise<Url | null> {
    const doc = await UrlModel.findOneAndUpdate({ shortCode: code }, { url: newUrl }, { new: true });

    if (!doc) return null;

    return new Url(
      doc._id.toString(),
      doc.url,
      doc.shortCode,
      doc.accessCount,
      doc.createdAt,
      doc.updatedAt
    );
  }
  async delete(code: string): Promise<boolean> {
    const result = await UrlModel.findOneAndDelete({ shortCode: code });

    return !!result;
  }
  async incrementAccesCount(code: string): Promise<void> {
    await UrlModel.findOneAndUpdate({ shortCode: code }, { $inc: { accessCount: 1 } });
  }
  async create(url: string, shortCode: string): Promise<Url> {
      const doc = await UrlModel.create({ url, shortCode });

      return new Url(
        doc._id.toString(),
        doc.url,
        doc.shortCode,
        doc.accessCount,
        doc.createdAt,
        doc.updatedAt
      );
  }
}