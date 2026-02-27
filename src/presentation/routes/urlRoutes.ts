import { Router } from "express";
import { UrlController } from "../controllers/UrlController";

export function createUrlRoutes(controller: UrlController) {
  const router = Router();

  router.post("/", (req, res) => controller.create(req, res));
  router.get("/details/:code", (req, res) => controller.details(req, res));
  router.get("/:code", (req, res) => controller.redirect(req, res));
  router.put("/:code", (req, res) => controller.update(req, res));
  router.delete("/:code", (req, res) => controller.delete(req, res));

return router;
}