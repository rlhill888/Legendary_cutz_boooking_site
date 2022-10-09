/*
  Warnings:

  - A unique constraint covering the columns `[monthDate,barberId]` on the table `MonthCalendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonthCalendar_monthDate_barberId_key" ON "MonthCalendar"("monthDate", "barberId");
