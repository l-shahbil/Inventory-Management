import { Request, Response } from "express";
import { ProductService } from "../../services/Admin/productServices";

export const ProductController = {
  async getAll(req: Request, res: Response) {
    const products = await ProductService.getAll();
    res.json(products);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await ProductService.getById(id);
    res.json(product);
  },

  async create(req: Request, res: Response) {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedProduct = await ProductService.update(id, req.body);
    res.json(updatedProduct);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await ProductService.delete(id);
    res.json({ message: "Deleted successfully" });
  },
};
