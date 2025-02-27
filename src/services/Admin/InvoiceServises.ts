import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SalesService = {
    async getAllSales() {
        return await prisma.invoices.findMany({
            include: {
                Employee: { 
                    select: { Name: true } 
                },
                items: {
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
                InvoiceDate: "desc",
            },
        });
    },
};
