import { Router } from "express";
import { ProductController } from "../controller/productController";

const router = Router();

router.route("/")
  .get(ProductController.getAll)
  .post(ProductController.create);

router.route("/:id")
  .get(ProductController.getById)
  .put(ProductController.update)
  .delete(ProductController.delete);

export default router;
