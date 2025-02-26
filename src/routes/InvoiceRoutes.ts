import { Router } from "express";
import { InvoiceController } from "../controller/InvoiceController";

const router = Router();

router.get("/", InvoiceController.getAll);

export default router;
