import { Router } from "express";
import { IncomingController } from "../controller/IncomingController";

const router = Router();

router.get("/", IncomingController.getIncomingReport);

export default router;
