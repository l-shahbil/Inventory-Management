import { Request, Response } from "express";
import { ProductService } from "../service/product.service";

export const ProductController = {
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await ProductService.getById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error fetching product" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newProduct = await ProductService.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("🚨 Error creating product:", error); // ✅ طباعة الخطأ في الـ console
      res.status(500).json({ error: "Error creating product", details: error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedProduct = await ProductService.update(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ProductService.delete(id);
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  },
};
