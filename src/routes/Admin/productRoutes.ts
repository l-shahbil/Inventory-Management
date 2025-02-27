import { Router } from "express";
import { ProductController } from "../../controller/Admin/productController";
import { authenticate, authorize } from "../../middleware/authMiddleware";

const router = Router();

router.route("/")
  .get(authenticate,authorize(["ADMIN","EMPLOYEE"]),ProductController.getAll)
  .post(authenticate,authorize(["ADMIN"]),ProductController.create);

router.route("/:id")
  .get(authenticate,authorize(["ADMIN","EMPLOYEE"]),ProductController.getById)
  .put(authenticate,authorize(["ADMIN","EMPLOYEE"]),ProductController.update)
  .delete(authenticate,authorize(["ADMIN"]),ProductController.delete);

export default router;
