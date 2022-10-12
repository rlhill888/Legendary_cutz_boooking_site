/*
  Warnings:

  - A unique constraint covering the columns `[date,barberId]` on the table `DayCalendar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,barberId]` on the table `YearCalendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DayCalendar_date_barberId_key" ON "DayCalendar"("date", "barberId");

-- CreateIndex
CREATE UNIQUE INDEX "YearCalendar_year_barberId_key" ON "YearCalendar"("year", "barberId");
