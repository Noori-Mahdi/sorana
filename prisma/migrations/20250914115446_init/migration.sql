-- CreateTable
CREATE TABLE "public"."Car" (
    "id" TEXT NOT NULL,
    "marker" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "FromYear" TIMESTAMP(3),
    "ToYear" TIMESTAMP(3),
    "body" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brake" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "length" TEXT,
    "width" TEXT,
    "mainTechnicalCode" TEXT,
    "FMSITechnicalCode" TEXT,
    "HIQTechnicalCode" TEXT,
    "WVATechnicalCode" TEXT,
    "image" TEXT,

    CONSTRAINT "Brake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CarBrakes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CarBrakes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CarBrakes_B_index" ON "public"."_CarBrakes"("B");

-- AddForeignKey
ALTER TABLE "public"."_CarBrakes" ADD CONSTRAINT "_CarBrakes_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Brake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CarBrakes" ADD CONSTRAINT "_CarBrakes_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
