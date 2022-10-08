/*
  Warnings:

  - Added the required column `dayId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `YearCalendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "dayId" INTEGER NOT NULL,
ADD COLUMN     "monthId" INTEGER NOT NULL,
ADD COLUMN     "yearId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "fiveYearScheduleCreated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "YearCalendar" ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MonthCalendar" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "monthNumber" INTEGER NOT NULL,
    "monthDate" TEXT NOT NULL,
    "barberId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,

    CONSTRAINT "MonthCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayCalendar" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "availibility" TEXT NOT NULL,
    "weekDayInt" INTEGER NOT NULL,
    "weekDayString" TEXT NOT NULL,
    "timeSlotsTaken" TEXT NOT NULL,
    "dayBlockedOff" BOOLEAN NOT NULL,
    "timeUnavailable" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "barberId" INTEGER NOT NULL,
    "monthId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,

    CONSTRAINT "DayCalendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "DayCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "MonthCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "YearCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthCalendar" ADD CONSTRAINT "MonthCalendar_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthCalendar" ADD CONSTRAINT "MonthCalendar_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "YearCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayCalendar" ADD CONSTRAINT "DayCalendar_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "YearCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayCalendar" ADD CONSTRAINT "DayCalendar_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "MonthCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayCalendar" ADD CONSTRAINT "DayCalendar_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
