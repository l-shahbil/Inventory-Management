import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSupplier = async (supplierData: any) => {
  return await prisma.suppliers.create({
    data: supplierData
  });
};

export const updateSuplier = async (supplierId: string, supplierData: any) => {
  return await prisma.suppliers.update({
    where: { SupplierId: supplierId },
    data: supplierData
  });
};

export const removesupplier = async (supplierId: string) => {
  return await prisma.suppliers.delete({
    where: { SupplierId: supplierId }
  });
};

export const getsuppliers = async () => {
  return await prisma.suppliers.findMany();
};
