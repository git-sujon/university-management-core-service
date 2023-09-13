-- CreateTable
CREATE TABLE "StudentAcademicInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalCompletedCredit" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "StudentAcademicInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentAcademicInfo" ADD CONSTRAINT "StudentAcademicInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
