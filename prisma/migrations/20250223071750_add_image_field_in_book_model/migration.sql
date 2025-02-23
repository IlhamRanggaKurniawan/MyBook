/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_image_key" ON "Book"("image");
