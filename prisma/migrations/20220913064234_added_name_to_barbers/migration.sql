/*
  Warnings:

  - Added the required column `name` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Made the column `barberId` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_barberId_fkey";

-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "barberId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
