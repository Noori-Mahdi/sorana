/*
  Warnings:

  - You are about to drop the column `price` on the `Sold` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Sold` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Sold` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sold" DROP CONSTRAINT "Sold_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Sold" DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "public"."SoldProduct" (
    "id" TEXT NOT NULL,
    "soldId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SoldProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SoldProduct" ADD CONSTRAINT "SoldProduct_soldId_fkey" FOREIGN KEY ("soldId") REFERENCES "public"."Sold"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SoldProduct" ADD CONSTRAINT "SoldProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
