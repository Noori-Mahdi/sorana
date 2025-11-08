/*
  Warnings:

  - You are about to drop the column `productName` on the `Sold` table. All the data in the column will be lost.
  - Added the required column `prdouctId` to the `Sold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sold" DROP COLUMN "productName",
ADD COLUMN     "prdouctId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Sold" ADD CONSTRAINT "Sold_prdouctId_fkey" FOREIGN KEY ("prdouctId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
