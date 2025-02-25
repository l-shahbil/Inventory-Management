/*
  Warnings:

  - Changed the type of `Phone` on the `Suppliers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Phone` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Suppliers" DROP COLUMN "Phone",
ADD COLUMN     "Phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Phone",
ADD COLUMN     "Phone" INTEGER NOT NULL;
