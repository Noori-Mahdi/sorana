/*
  Warnings:

  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - The `mainTechnicalCode` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `FMSITechnicalCode` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `HIQTechnicalCode` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `WVATechnicalCode` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `DicsType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ProductType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EProductType" AS ENUM ('frontRotor', 'frontBrake', 'rearRotor', 'rearBrake', 'parkingShoe');

-- CreateEnum
CREATE TYPE "public"."EDicsType" AS ENUM ('Solid', 'Vented', 'Drilled', 'Slotted', 'Floating', 'Carbon');

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "type",
ADD COLUMN     "BrakeSystem" TEXT,
ADD COLUMN     "CenteringDiameter" INTEGER,
ADD COLUMN     "DicsType" "public"."EDicsType" NOT NULL,
ADD COLUMN     "DiscThicknessMax" INTEGER,
ADD COLUMN     "DiscThicknessMin" INTEGER,
ADD COLUMN     "Drum" INTEGER,
ADD COLUMN     "Height" INTEGER,
ADD COLUMN     "NumOfHoles" INTEGER,
ADD COLUMN     "Outter" INTEGER,
ADD COLUMN     "PcsInSet" TEXT,
ADD COLUMN     "PitchCircle" INTEGER,
ADD COLUMN     "ProductType" "public"."EProductType" NOT NULL,
ADD COLUMN     "StructureMaterial" TEXT,
ADD COLUMN     "Thickness" TEXT,
DROP COLUMN "mainTechnicalCode",
ADD COLUMN     "mainTechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "FMSITechnicalCode",
ADD COLUMN     "FMSITechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "HIQTechnicalCode",
ADD COLUMN     "HIQTechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "WVATechnicalCode",
ADD COLUMN     "WVATechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropEnum
DROP TYPE "public"."ProductType";
