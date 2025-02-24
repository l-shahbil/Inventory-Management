import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ProductService = {
  async getAll() {
    return await prisma.products.findMany({
      include: { Category: true }, // لجلب بيانات التصنيف المرتبط
    });
  },

  async getById(id: number) {
    return await prisma.products.findUnique({
      where: { ProductId: id },
      include: { Category: true },
    });
  },

  async create(data: any) {
    return await prisma.products.create({ data });
  },

  async update(id: number, data: any) {
    return await prisma.products.update({
      where: { ProductId: id },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.products.delete({ where: { ProductId: id } });
  },
};
