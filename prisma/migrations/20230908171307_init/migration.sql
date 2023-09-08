-- CreateTable
CREATE TABLE "StudentSemesterRegistrationCourses" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCoursesId" TEXT NOT NULL,
    "offeredCoursesSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentSemesterRegistrationCourses_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCoursesId")
);

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistrationCourses" ADD CONSTRAINT "StudentSemesterRegistrationCourses_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "SemesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistrationCourses" ADD CONSTRAINT "StudentSemesterRegistrationCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistrationCourses" ADD CONSTRAINT "StudentSemesterRegistrationCourses_offeredCoursesId_fkey" FOREIGN KEY ("offeredCoursesId") REFERENCES "OfferedCourses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesterRegistrationCourses" ADD CONSTRAINT "StudentSemesterRegistrationCourses_offeredCoursesSectionId_fkey" FOREIGN KEY ("offeredCoursesSectionId") REFERENCES "OfferedCoursesSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
