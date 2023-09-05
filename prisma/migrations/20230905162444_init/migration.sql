-- CreateTable
CREATE TABLE "OfferedCoursesSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEnrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCoursesId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "OfferedCoursesSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferedCoursesSection" ADD CONSTRAINT "OfferedCoursesSection_offeredCoursesId_fkey" FOREIGN KEY ("offeredCoursesId") REFERENCES "OfferedCourses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedCoursesSection" ADD CONSTRAINT "OfferedCoursesSection_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "SemesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
