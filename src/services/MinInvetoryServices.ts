import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const MinInventoryService = {
  async getAll() {
    return await prisma.products.findMany({
      where: {
        StockQuantity: {
          lte: prisma.products.fields.MinStockLevel,
        },
      },
      include: {
        Category: true,
      },
    });
  },
};

