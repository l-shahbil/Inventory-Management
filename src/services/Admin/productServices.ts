import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ProductService = {
  async getAll() {
    return prisma.products.findMany({ include: 
      { Category: {
        select:{
          CategoryName:true
        }
    } } });
  },

  async getById(id: number) {
    return prisma.products.findUnique({ where: { ProductId: id }, include: { Category: true } });
  },

  async create(data: any) {
    return prisma.products.create({ data });
  },

  async update(id: number, data: any) {
    return prisma.products.update({ where: { ProductId: id }, data });
  },

  async delete(id: number) {
    return prisma.products.delete({ where: { ProductId: id } });
  },
  
};
