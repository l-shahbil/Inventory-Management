/*
  Warnings:

  - The primary key for the `Invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Suppliers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "InventoryReceipts" DROP CONSTRAINT "InventoryReceipts_SupplierId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryReceipts" DROP CONSTRAINT "InventoryReceipts_UserId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceItems" DROP CONSTRAINT "InvoiceItems_InvoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_UserId_fkey";

-- AlterTable
ALTER TABLE "InventoryReceipts" ALTER COLUMN "SupplierId" SET DATA TYPE TEXT,
ALTER COLUMN "UserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "InvoiceItems" ALTER COLUMN "InvoiceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_pkey",
ALTER COLUMN "InvoiceId" DROP DEFAULT,
ALTER COLUMN "InvoiceId" SET DATA TYPE TEXT,
ALTER COLUMN "UserId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY ("InvoiceId");
DROP SEQUENCE "Invoices_InvoiceId_seq";

-- AlterTable
ALTER TABLE "Suppliers" DROP CONSTRAINT "Suppliers_pkey",
ALTER COLUMN "SupplierId" DROP DEFAULT,
ALTER COLUMN "SupplierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("SupplierId");
DROP SEQUENCE "Suppliers_SupplierId_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "UserId" DROP DEFAULT,
ALTER COLUMN "UserId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");
DROP SEQUENCE "User_UserId_seq";

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES "Invoices"("InvoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceipts" ADD CONSTRAINT "InventoryReceipts_SupplierId_fkey" FOREIGN KEY ("SupplierId") REFERENCES "Suppliers"("SupplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceipts" ADD CONSTRAINT "InventoryReceipts_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
