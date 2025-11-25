/*
  Warnings:

  - You are about to drop the column `asked` on the `FAQ` table. All the data in the column will be lost.
  - Added the required column `answer` to the `FAQ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FAQ" DROP COLUMN "asked",
ADD COLUMN     "answer" TEXT NOT NULL;
