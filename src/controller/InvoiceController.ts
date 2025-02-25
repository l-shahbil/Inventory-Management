import { Request, Response } from "express";
import { InvoiceService } from "../services/InvoiceServises";

export const InvoiceController = {
    async getAll(req: Request, res: Response) {
        const sales = await InvoiceService.getAllSales();
        res.json(sales);
    },
    async create(req: Request, res: Response) {
        const { userId, items } = req.body; 
        const newInvoice = await InvoiceService.createInvoice(userId, items);
        res.status(201).json(newInvoice);
    }

   
};
