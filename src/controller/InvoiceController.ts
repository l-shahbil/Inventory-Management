import { Request, Response } from "express";
import { SalesService } from "../services/InvoiceServises";

export const InvoiceController = {
    async getAll(req: Request, res: Response) {
        const sales = await SalesService.getAllSales();
        res.json(sales);
    },

   
};
