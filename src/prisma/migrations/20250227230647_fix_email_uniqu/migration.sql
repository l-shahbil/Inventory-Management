-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'EMPLOYEE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "SupplierId" TEXT NOT NULL,
    "SupplierName" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("SupplierId")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductId" SERIAL NOT NULL,
    "ProductName" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "StockQuantity" INTEGER NOT NULL,
    "SerialNumber" TEXT NOT NULL,
    "MinStockLevel" INTEGER NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "CategoryId" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "InvoiceId" TEXT NOT NULL,
    "InvoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("InvoiceId")
);

-- CreateTable
CREATE TABLE "InvoiceItems" (
    "InvoiceItemId" SERIAL NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "InvoiceId" TEXT NOT NULL,

    CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY ("InvoiceItemId")
);

-- CreateTable
CREATE TABLE "InventoryReceipts" (
    "ReceiptId" SERIAL NOT NULL,
    "ReceiptDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "SupplierId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "InventoryReceipts_pkey" PRIMARY KEY ("ReceiptId")
);

-- CreateTable
CREATE TABLE "InventoryReceiptItems" (
    "ReceiptItemId" SERIAL NOT NULL,
    "ReceiptId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "QuantityReceived" INTEGER NOT NULL,

    CONSTRAINT "InventoryReceiptItems_pkey" PRIMARY KEY ("ReceiptItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_SupplierName_key" ON "Suppliers"("SupplierName");

-- CreateIndex
CREATE UNIQUE INDEX "Products_ProductName_key" ON "Products"("ProductName");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_CategoryName_key" ON "Categories"("CategoryName");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES "Invoices"("InvoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceipts" ADD CONSTRAINT "InventoryReceipts_SupplierId_fkey" FOREIGN KEY ("SupplierId") REFERENCES "Suppliers"("SupplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceipts" ADD CONSTRAINT "InventoryReceipts_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceiptItems" ADD CONSTRAINT "InventoryReceiptItems_ReceiptId_fkey" FOREIGN KEY ("ReceiptId") REFERENCES "InventoryReceipts"("ReceiptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReceiptItems" ADD CONSTRAINT "InventoryReceiptItems_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
