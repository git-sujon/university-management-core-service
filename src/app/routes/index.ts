import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { StudentRouter } from '../modules/student/student.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { BuildingRouter } from '../modules/building/building.route';
import { RoomRouter } from '../modules/room/room.route';
import { CourseRouter } from '../modules/course/course.route';
import { SemesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCoursesRouter } from '../modules/offeredCourses/offeredCourses.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    route: AcademicSemesterRouter
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRouter
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRouter
  },
  {
    path: "/students",
    route: StudentRouter
  },
  {
    path: "/faculties",
    route: FacultyRouter
  },
  {
    path: "/buildings",
    route: BuildingRouter
  },
  {
    path: "/rooms",
    route: RoomRouter
  },
  {
    path: "/courses",
    route: CourseRouter
  },
  {
    path: "/semester-registration",
    route: SemesterRegistrationRouter
  },
  {
    path: "/offered-courses",
    route: OfferedCoursesRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
