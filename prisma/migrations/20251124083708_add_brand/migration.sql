/*
  Warnings:

  - You are about to drop the column `BrakeSystem` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `CenteringDiameter` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `DicsType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `DiscThicknessMax` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `DiscThicknessMin` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Drum` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `FMSITechnicalCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `HIQTechnicalCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Height` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `NumOfHoles` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Outter` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `PcsInSet` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `PitchCircle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ProductType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Radius` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `StructureMaterial` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Thickness` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `WVATechnicalCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `mainTechnicalCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Product_name_key";

-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "productBaseId" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "BrakeSystem",
DROP COLUMN "CenteringDiameter",
DROP COLUMN "DicsType",
DROP COLUMN "DiscThicknessMax",
DROP COLUMN "DiscThicknessMin",
DROP COLUMN "Drum",
DROP COLUMN "FMSITechnicalCode",
DROP COLUMN "HIQTechnicalCode",
DROP COLUMN "Height",
DROP COLUMN "NumOfHoles",
DROP COLUMN "Outter",
DROP COLUMN "PcsInSet",
DROP COLUMN "PitchCircle",
DROP COLUMN "ProductType",
DROP COLUMN "Radius",
DROP COLUMN "StructureMaterial",
DROP COLUMN "Thickness",
DROP COLUMN "WVATechnicalCode",
DROP COLUMN "image",
DROP COLUMN "length",
DROP COLUMN "mainTechnicalCode",
DROP COLUMN "name",
DROP COLUMN "width",
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "productBaseId" TEXT,
ADD COLUMN     "stock" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."ProductBase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ProductType" "public"."EProductType" NOT NULL,
    "image" TEXT,
    "DicsType" "public"."EDicsType",
    "DiscThicknessMax" DOUBLE PRECISION,
    "DiscThicknessMin" DOUBLE PRECISION,
    "NumOfHoles" DOUBLE PRECISION,
    "CenteringDiameter" DOUBLE PRECISION,
    "PitchCircle" DOUBLE PRECISION,
    "Outter" DOUBLE PRECISION,
    "Drum" DOUBLE PRECISION,
    "Height" DOUBLE PRECISION,
    "StructureMaterial" TEXT,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "Thickness" DOUBLE PRECISION,
    "PcsInSet" DOUBLE PRECISION,
    "BrakeSystem" TEXT,
    "Radius" DOUBLE PRECISION,
    "mainTechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "FMSITechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "HIQTechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "WVATechnicalCode" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "ProductBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "public"."Brand"("name");

-- AddForeignKey
ALTER TABLE "public"."Car" ADD CONSTRAINT "Car_productBaseId_fkey" FOREIGN KEY ("productBaseId") REFERENCES "public"."ProductBase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_productBaseId_fkey" FOREIGN KEY ("productBaseId") REFERENCES "public"."ProductBase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Brand" ADD CONSTRAINT "Brand_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
