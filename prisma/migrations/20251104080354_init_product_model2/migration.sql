/*
  Warnings:

  - The `length` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `width` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `PcsInSet` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Thickness` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "length",
ADD COLUMN     "length" DOUBLE PRECISION,
DROP COLUMN "width",
ADD COLUMN     "width" DOUBLE PRECISION,
ALTER COLUMN "CenteringDiameter" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "DicsType" DROP NOT NULL,
ALTER COLUMN "DiscThicknessMax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "DiscThicknessMin" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "Drum" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "Height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "NumOfHoles" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "Outter" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "PcsInSet",
ADD COLUMN     "PcsInSet" DOUBLE PRECISION,
ALTER COLUMN "PitchCircle" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "Thickness",
ADD COLUMN     "Thickness" DOUBLE PRECISION;
