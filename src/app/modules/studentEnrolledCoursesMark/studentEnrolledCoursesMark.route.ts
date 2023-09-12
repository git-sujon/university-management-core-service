import express from 'express';
import { StudentEnrolledCoursesMarksController } from './studentEnrolledCoursesMark.controller';

const router = express.Router();

router.patch('/update-marks', StudentEnrolledCoursesMarksController.updateStudentMarksController);

export const StudentEnrolledCoursesMarksRoutes = router