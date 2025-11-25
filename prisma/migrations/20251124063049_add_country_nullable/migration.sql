-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "countryId" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "countryId" TEXT;

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "flagImage" TEXT NOT NULL,
    "countryImage" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryName_key" ON "public"."Country"("countryName");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Car" ADD CONSTRAINT "Car_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
