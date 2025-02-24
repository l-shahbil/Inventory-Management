import { Router } from "express";
import { ProductController } from "../controller/product.controller";

const router = Router();

// ربط الدوال مع الراوتر بشكل صحيح
router.get("/", (req, res) => ProductController.getAll(req, res));
router.post("/", (req, res) => ProductController.create(req, res));
router.put("/:id", (req, res) => ProductController.update(req, res));
router.delete("/:id", (req, res) => ProductController.delete(req, res));

export default router;
