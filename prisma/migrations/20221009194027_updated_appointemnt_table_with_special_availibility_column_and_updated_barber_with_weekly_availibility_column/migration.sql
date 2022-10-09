/*
  Warnings:

  - Added the required column `specialAvailibility` to the `DayCalendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "weeklyAvailibility" TEXT NOT NULL DEFAULT 'none';

-- AlterTable
ALTER TABLE "DayCalendar" ADD COLUMN     "specialAvailibility" BOOLEAN NOT NULL;
