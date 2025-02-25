import { PrismaClient } from "@prisma/client";

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
    }
};
