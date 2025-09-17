/*
  Warnings:

  - You are about to drop the column `FromYear` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `ToYear` on the `Car` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Brake` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userPhone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('frontRotor', 'frontBrake', 'rearRotor', 'rearBrake', 'parkingShoe');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('online', 'offline');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Role" ADD VALUE 'owner';
ALTER TYPE "public"."Role" ADD VALUE 'support';

-- DropForeignKey
ALTER TABLE "public"."_CarBrakes" DROP CONSTRAINT "_CarBrakes_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CarBrakes" DROP CONSTRAINT "_CarBrakes_B_fkey";

-- DropIndex
DROP INDEX "public"."User_phone_key";

-- AlterTable
ALTER TABLE "public"."Car" DROP COLUMN "FromYear",
DROP COLUMN "ToYear",
ADD COLUMN     "fromYear" TIMESTAMP(3),
ADD COLUMN     "toYear" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "addrace" TEXT,
ADD COLUMN     "ban" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyphone" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'offline',
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "userPhone" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "public"."Brake";

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rate" INTEGER,
    "report" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sold" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ProductType" NOT NULL,
    "length" TEXT,
    "width" TEXT,
    "mainTechnicalCode" TEXT,
    "FMSITechnicalCode" TEXT,
    "HIQTechnicalCode" TEXT,
    "WVATechnicalCode" TEXT,
    "image" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "public"."User"("userPhone");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sold" ADD CONSTRAINT "Sold_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CarBrakes" ADD CONSTRAINT "_CarBrakes_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CarBrakes" ADD CONSTRAINT "_CarBrakes_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
