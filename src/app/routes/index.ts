import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { StudentRouter } from '../modules/student/student.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
