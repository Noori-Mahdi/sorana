/*
  Warnings:

  - You are about to drop the column `marker` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[series]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Car" DROP COLUMN "marker";

-- CreateIndex
CREATE UNIQUE INDEX "Car_series_key" ON "public"."Car"("series");
