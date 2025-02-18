/*
  Warnings:

  - A unique constraint covering the columns `[nis]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nis" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_nis_key" ON "User"("nis");
