import { Router } from "express";
import { MinInventoryController } from "../../controller/Admin/MinInvetoryController";
import { authenticate, authorize } from "../../middleware/authMiddleware";

const router = Router();

router.get("/",authenticate,authorize(["ADMIN"]), MinInventoryController.getAll);

export default router;
