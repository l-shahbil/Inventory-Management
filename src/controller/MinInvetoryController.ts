import { Request, Response } from "express";
import { MinInventoryService } from "../services/MinInvetoryServices";

export const MinInventoryController = {
    async getAll(req: Request, res: Response) {
        const products = await MinInventoryService.getAll();
        res.json(products);
    }
};
