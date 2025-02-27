import { Request, Response } from "express";
import { Incomings } from "../services/IncomingService";

export const IncomingController = {
    async getIncomingReport(req: Request, res: Response) {
        const report = await Incomings.getIncomings();
        res.json(report);
    },

    async create(req: Request, res: Response) {
        const { userId, supplierId, items } = req.body; 
        const newIncoming = await Incomings.createIncoming(userId, supplierId, items);
        res.status(201).json(newIncoming);
    }
};
