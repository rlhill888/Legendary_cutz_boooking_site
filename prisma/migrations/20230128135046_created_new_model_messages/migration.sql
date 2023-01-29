-- AlterTable
ALTER TABLE "DayCalendar" ALTER COLUMN "timeSlotsTaken" SET DEFAULT '[]',
ALTER COLUMN "blockedOffTimesArray" SET DEFAULT '[]';

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "cancelledAppointmentNotification" BOOLEAN NOT NULL,
    "cancelledAppointmentId" INTEGER NOT NULL,
    "messageData" TEXT NOT NULL,
    "barberId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
