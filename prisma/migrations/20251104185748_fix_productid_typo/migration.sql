/*
  Warnings:

  - You are about to drop the column `prdouctId` on the `Sold` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Sold` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Sold" DROP CONSTRAINT "Sold_prdouctId_fkey";

-- AlterTable
ALTER TABLE "public"."Sold" DROP COLUMN "prdouctId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Sold" ADD CONSTRAINT "Sold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
