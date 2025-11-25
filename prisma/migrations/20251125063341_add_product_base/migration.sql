/*
  Warnings:

  - You are about to drop the column `ProductType` on the `ProductBase` table. All the data in the column will be lost.
  - Added the required column `ProductBaseType` to the `ProductBase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EProductBaseType" AS ENUM ('frontRotor', 'frontBrake', 'rearRotor', 'rearBrake', 'parkingShoe');

-- AlterTable
ALTER TABLE "public"."ProductBase" DROP COLUMN "ProductType",
ADD COLUMN     "ProductBaseType" "public"."EProductBaseType" NOT NULL;

-- DropEnum
DROP TYPE "public"."EProductType";
