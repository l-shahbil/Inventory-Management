import { Router } from "express";
import { InvoiceController } from "../../controller/Admin/InvoiceController";
import { authenticate, authorize } from "../../middleware/authMiddleware";

const router = Router();

router.get("/",authenticate,authorize(["ADMIN"]), InvoiceController.getAll);

export default router;
