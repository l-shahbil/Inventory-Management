import { Request, Response } from "express";
import { Incomings } from "../services/IncomingService";

export const IncomingController = {
    async getIncomingReport(req: Request, res: Response) {
        const report = await Incomings.getIncomings();
        res.json(report);
    }
};
