import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoUrlRepository } from "./infrastructure/mongo/MongUrlRepository";
import { CreateUrl } from "./application/usecases/CreateUrl";
import { GetUrl } from "./application/usecases/GetUrl";
import { UrlController } from "./presentation/controllers/UrlController";
import { createUrlRoutes } from "./presentation/routes/urlRoutes";
import { UpdateUrl } from "./application/usecases/UpdateUrl";
import { DeleteUrl } from "./application/usecases/DeleteUrl";
import { GetUrlDetails } from "./application/usecases/GetUrlDetails";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));

// dependency injection

// infrastructure
const urlRepository = new MongoUrlRepository();

// use cases
const createUrl = new CreateUrl(urlRepository);
const getUrl = new GetUrl(urlRepository);
const updateUrl = new UpdateUrl(urlRepository);
const deleteUrl = new DeleteUrl(urlRepository);
const getDetails = new GetUrlDetails(urlRepository);

// controller
const urlController = new UrlController(
  getUrl, 
  createUrl,
  updateUrl,
  deleteUrl,
  getDetails
);

// routes
app.use("/", createUrlRoutes(urlController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});