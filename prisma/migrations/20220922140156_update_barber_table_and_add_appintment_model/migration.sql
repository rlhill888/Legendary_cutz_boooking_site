/*
  Warnings:

  - Added the required column `offDays` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "keepTrackOfAppointmentsBeingPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offDays" TEXT NOT NULL,
ALTER COLUMN "recieveNewAppointmentReminders" SET DEFAULT false,
ALTER COLUMN "recieveCanceledAppointmentReminders" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "stripeSessionsId" TEXT NOT NULL,
    "appointmentMadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentStartTime" TEXT NOT NULL,
    "appointmentPaid" BOOLEAN NOT NULL DEFAULT false,
    "appointmentEndTime" TEXT NOT NULL,
    "totalPriceAfterDownPayment" DOUBLE PRECISION NOT NULL,
    "downPaymentPaid" BOOLEAN NOT NULL DEFAULT false,
    "dateOfAppointment" TEXT NOT NULL,
    "cancelledAppointment" BOOLEAN NOT NULL DEFAULT false,
    "appintmnetCustomerNames" TEXT NOT NULL,
    "appointmentDone" BOOLEAN NOT NULL DEFAULT false,
    "phomeNumber" TEXT NOT NULL,
    "barberId" INTEGER NOT NULL,
    "recieptDetails" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_stripeSessionsId_key" ON "Appointment"("stripeSessionsId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
