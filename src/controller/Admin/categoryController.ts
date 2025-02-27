import { Request , Response } from "express";
import { categoryService } from "../../services/Admin/categoryServices";

export const CategoryController={
    async getAll(req:Request , res:Response) {
        const categories = await categoryService.getAll();
        res.json(categories)
    },

    async getById(req:Request , res: Response) {
        const id = Number (req.params.id);
        const category = await categoryService.getByid(id);
        res.json(category)
    },

    async create (req:Request , res:Response) {
        const newCategory = await categoryService.create(req.body);
        res.status(201).json(newCategory);
    },

    async update (req:Request , res:Response) {
        const id = Number(req.params.id)
        const updatedCategory = await categoryService.update(id,req.body);
        res.json(updatedCategory);
    },

    async delete(req:Request , res:Response) {
        const id = Number(req.params.id);
        await categoryService.delete(id);
        res.json({ message: "Deleted successfully"})
    },
}