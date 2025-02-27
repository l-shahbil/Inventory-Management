/*
  Warnings:

  - A unique constraint covering the columns `[SupplierName]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_SupplierName_key" ON "Suppliers"("SupplierName");
