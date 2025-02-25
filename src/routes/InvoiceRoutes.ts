import { Router } from "express";
import { InvoiceController } from "../controller/invoiceController";

const router = Router();

router.get("/", InvoiceController.getAll);

export default router;
