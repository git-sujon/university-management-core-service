import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { FacultyValidation } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidation.insertIntoDbValidation),
  CourseController.insertIntoDbController
);

router.get('/', CourseController.getAllFromDbController);
router.get('/:id', CourseController.getDataByIdController);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateFromDbValidation),
  CourseController.updateDataController
);
router.delete('/:id', CourseController.deleteDataController);

router.post(
  '/:id/assign-faculties',
  validateRequest(FacultyValidation.assignOrRemoveFaculties),
  CourseController.assignFacultiesController
);
router.delete(
  '/:id/delete-faculties',
  validateRequest(FacultyValidation.assignOrRemoveFaculties),
  CourseController.deleteAssignFacultiesController
);

export const CourseRouter = router;
