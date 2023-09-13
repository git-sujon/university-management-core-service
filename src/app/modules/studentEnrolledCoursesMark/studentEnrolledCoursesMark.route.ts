import express from 'express';
import { StudentEnrolledCoursesMarksController } from './studentEnrolledCoursesMark.controller';

const router = express.Router();

router.patch('/update-marks', StudentEnrolledCoursesMarksController.updateStudentMarksController);
router.patch('/update-total-marks', StudentEnrolledCoursesMarksController.updateTotalMarksController);

export const StudentEnrolledCoursesMarksRoutes = router