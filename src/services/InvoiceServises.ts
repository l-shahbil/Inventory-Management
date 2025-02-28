import { PrismaClient,Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const InvoiceService = {
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
    async createInvoice(userId: number, items: { ProductId: number; Quantity: number }[]) {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const invoice = await tx.invoices.create({
                data: {
                    UserId: String(userId),
                },
            });

            const invoiceItems = await Promise.all(
                items.map(async (item) => {
                    return await tx.invoiceItems.create({
                        data: {
                            InvoiceId: invoice.InvoiceId,
                            ProductId: item.ProductId,
                            Quantity: item.Quantity,
                        },
                    });
                })
            );

            await Promise.all(
                items.map(async (item) => {
                    return await tx.products.update({
                        where: { ProductId: item.ProductId },
                        data: { StockQuantity: { decrement: item.Quantity } }, 
                    });
                })
            );

            return { invoice, invoiceItems };
        });
    },
};
