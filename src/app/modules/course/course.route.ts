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

router.get('/', CourseController.getAllFromDbController);
router.get('/:id', CourseController.getDataByIdController);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateFromDbValidation),
  CourseController.updateDataController
);
router.delete('/:id', CourseController.deleteDataController);

router.post('/:id/assign-faculties', CourseController.assignFacultiesController)
router.delete('/:id/delete-faculties', CourseController.deleteAssignFacultiesController)

export const CourseRouter = router;
