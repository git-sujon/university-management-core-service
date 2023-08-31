/*
  Warnings:

  - The values [UPCOMMING] on the enum `SemesterRegistrationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SemesterRegistrationStatus_new" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');
ALTER TABLE "SemesterRegistration" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "SemesterRegistration" ALTER COLUMN "status" TYPE "SemesterRegistrationStatus_new" USING ("status"::text::"SemesterRegistrationStatus_new");
ALTER TYPE "SemesterRegistrationStatus" RENAME TO "SemesterRegistrationStatus_old";
ALTER TYPE "SemesterRegistrationStatus_new" RENAME TO "SemesterRegistrationStatus";
DROP TYPE "SemesterRegistrationStatus_old";
ALTER TABLE "SemesterRegistration" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
COMMIT;

-- AlterTable
ALTER TABLE "SemesterRegistration" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
