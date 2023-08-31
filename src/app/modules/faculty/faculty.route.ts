import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacultyValidation.insertIntoDbValidation),
  FacultyController.insertIntoDbController
);
router.get('/:id', FacultyController.getDataByIDController);
router.get('/', FacultyController.getAllFromDbController);
router.patch('/:id', FacultyController.updateDataController);
router.delete('/:id', FacultyController.deleteDataController);

router.post(
  '/:id/assign-courses',
  validateRequest(FacultyValidation.assignOrRemoveFaculties),
  FacultyController.assignCoursesController
);
router.delete(
  '/:id/delete-courses',
  validateRequest(FacultyValidation.assignOrRemoveFaculties),
  FacultyController.deleteAssignCoursesController
);

export const FacultyRouter = router;
