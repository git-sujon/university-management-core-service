/*
  Warnings:

  - You are about to drop the column `totalPaymentAmount` on the `StudentSemesterPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentSemesterPayment" DROP COLUMN "totalPaymentAmount",
ADD COLUMN     "totalPaidAmount" INTEGER DEFAULT 0;
