import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
