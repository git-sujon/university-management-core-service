/*
  Warnings:

  - You are about to drop the column `yaer` on the `AcademicSemester` table. All the data in the column will be lost.
  - Added the required column `year` to the `AcademicSemester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicSemester" DROP COLUMN "yaer",
ADD COLUMN     "year" INTEGER NOT NULL;
