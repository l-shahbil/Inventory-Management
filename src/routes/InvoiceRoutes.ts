import { Router } from "express";
import { InvoiceController } from "../controller/InvoiceController";

const router = Router();

router.get("/", InvoiceController.getAll);
router.post("/", InvoiceController.create); 

export default router;
