import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidation.insertIntoDbValidation),
  CourseController.insertIntoDbController
);

export const CourseRouter = router;
