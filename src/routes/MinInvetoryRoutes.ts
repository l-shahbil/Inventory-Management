import { Router } from "express";
import { MinInventoryController } from "../controller/MinInvetoryController";

const router = Router();

router.get("/", MinInventoryController.getAll);

export default router;
