import { PrismaClient,Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const Incomings = {
    async getIncomings() {
        return await prisma.inventoryReceipts.findMany({
            include: {
                Employee: { 
                    select: { Name: true } 
                },
                Supplier: { 
                    select: { SupplierName: true } 
                },
                receiptItems: {
                    include: {  
                        Product: { 
                            select: { 
                                ProductId: true, 
                                ProductName: true, 
                                SerialNumber: true, 
                                CategoryId: true 
                            } 
                        }
                    }
                }
            },
            orderBy: {
                ReceiptDate: "desc", 
            },
        });
    },

    async createIncoming(userId: number, supplierId: number, items: { ProductId: number; QuantityReceived: number }[]) {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const receipt = await tx.inventoryReceipts.create({
                data: {
                    UserId: String(userId), 
                    SupplierId: String(supplierId), 
                },
            });

            const receiptItems = await Promise.all(
                items.map(async (item) => {
                    return await tx.inventoryReceiptItems.create({
                        data: {
                            ReceiptId: receipt.ReceiptId,
                            ProductId: item.ProductId,
                            QuantityReceived: item.QuantityReceived,
                        },
                    });
                })
            );

            await Promise.all(
                items.map(async (item) => {
                    return await tx.products.update({
                        where: { ProductId: item.ProductId },
                        data: { StockQuantity: { increment: item.QuantityReceived } }, 
                    });
                })
            );

            return { receipt, receiptItems };
        });
    },

};
