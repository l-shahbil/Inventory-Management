import { Router } from "express"

import { CategoryController } from "../controller/categoryController"

const router = Router();

router.route("/")
  .get(CategoryController.getAll)
  .post(CategoryController.create);

router.route("/:id")
  .get(CategoryController.getById)
  .put(CategoryController.update)
  .delete(CategoryController.delete);

  export default router;