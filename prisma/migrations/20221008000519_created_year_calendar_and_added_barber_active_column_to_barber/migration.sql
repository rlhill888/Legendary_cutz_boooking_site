-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "barberActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "YearCalendar" (
    "id" SERIAL NOT NULL,
    "calendarObj" TEXT NOT NULL,
    "barberId" INTEGER NOT NULL,

    CONSTRAINT "YearCalendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YearCalendar" ADD CONSTRAINT "YearCalendar_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
