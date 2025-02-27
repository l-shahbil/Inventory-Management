import { Router } from "express";
import { IncomingController } from "../../controller/Admin/IncomingController";
import { authenticate, authorize } from "../../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate,authorize(["ADMIN"]),IncomingController.getIncomingReport);

export default router;
