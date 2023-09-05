import express from 'express';
import { OfferedCoursesController } from './offeredCourses.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesValidation } from './offeredCourses.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(OfferedCoursesValidation.insertIntoDbValidation),
  OfferedCoursesController.insertIntoDbController
);
router.get('/:id', OfferedCoursesController.getDataByIDController);
router.get('/', OfferedCoursesController.getAllFromDbController);
router.patch('/:id', OfferedCoursesController.updateDataController);
router.delete('/:id', OfferedCoursesController.deleteDataController);

export const OfferedCoursesRouter = router;
