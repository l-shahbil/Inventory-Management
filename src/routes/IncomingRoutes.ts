import { Router } from "express";
import { IncomingController } from "../controller/IncomingController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate,authorize(["ADMIN"]),IncomingController.getIncomingReport);
router.post("/",authenticate,authorize(["EMPLOYEE"]), IncomingController.create); 

export default router;
