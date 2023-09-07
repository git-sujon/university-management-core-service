-- CreateTable
CREATE TABLE "StudentSemesterRegistration" (
    "id" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "totalCreditsTaken" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "StudentSemesterRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistration" ADD CONSTRAINT "StudentSemesterRegistration_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "SemesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistration" ADD CONSTRAINT "StudentSemesterRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
