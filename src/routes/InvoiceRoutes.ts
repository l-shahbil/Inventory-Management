import { Router } from "express";
import { InvoiceController } from "../controller/InvoiceController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/",authenticate,authorize(["ADMIN"]), InvoiceController.getAll);
router.post("/", authenticate,authorize(["EMPLOYEE"]),InvoiceController.create); 

export default router;
