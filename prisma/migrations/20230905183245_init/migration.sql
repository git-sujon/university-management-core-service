-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

-- CreateTable
CREATE TABLE "OfferedCoursesClassSchedule" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "dayOfWeek" "WeekDays" NOT NULL DEFAULT 'Saturday',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCoursesSectionId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "OfferedCoursesClassSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferedCoursesClassSchedule" ADD CONSTRAINT "OfferedCoursesClassSchedule_offeredCoursesSectionId_fkey" FOREIGN KEY ("offeredCoursesSectionId") REFERENCES "OfferedCoursesSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedCoursesClassSchedule" ADD CONSTRAINT "OfferedCoursesClassSchedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "SemesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedCoursesClassSchedule" ADD CONSTRAINT "OfferedCoursesClassSchedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedCoursesClassSchedule" ADD CONSTRAINT "OfferedCoursesClassSchedule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
