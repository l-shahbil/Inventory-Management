import { Router } from "express"

import { CategoryController } from "../../controller/Admin/categoryController"
import { authenticate, authorize } from "../../middleware/authMiddleware";

const router = Router();

router.route("/")
  .get(authenticate,authorize(["ADMIN","EMPLOYEE"]),CategoryController.getAll)
  .post(authenticate,authorize(["ADMIN"]),CategoryController.create);

router.route("/:id")
  .get(authenticate,CategoryController.getById)
  .put(authenticate,authorize(["ADMIN"]),CategoryController.update)
  .delete(authenticate,authorize(["ADMIN"]),CategoryController.delete);

  export default router;