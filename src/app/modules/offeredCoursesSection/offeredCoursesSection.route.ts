import express from 'express';
import { OfferedCoursesSectionController } from './offeredCoursesSection.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesSectionValidation } from './offeredCoursesSection.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(OfferedCoursesSectionValidation.insertIntoDbValidation),
  OfferedCoursesSectionController.insertIntoDbController
);
router.get('/:id', OfferedCoursesSectionController.getDataByIDController);
router.get('/', OfferedCoursesSectionController.getAllFromDbController);
router.patch('/:id', OfferedCoursesSectionController.updateDataController);
router.delete('/:id', OfferedCoursesSectionController.deleteDataController);

export const OfferedCoursesSectionRouter = router;
