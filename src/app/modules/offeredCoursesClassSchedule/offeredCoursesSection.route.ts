import express from 'express';
import { OfferedCoursesClassScheduleController } from './offeredCoursesSection.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesClassScheduleValidation } from './offeredCoursesSection.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(OfferedCoursesClassScheduleValidation.insertIntoDbValidation),
  OfferedCoursesClassScheduleController.insertIntoDbController
);
router.get('/:id', OfferedCoursesClassScheduleController.getDataByIDController);
router.get('/', OfferedCoursesClassScheduleController.getAllFromDbController);
router.patch('/:id', OfferedCoursesClassScheduleController.updateDataController);
router.delete('/:id', OfferedCoursesClassScheduleController.deleteDataController);

export const OfferedCoursesClassScheduleRouter = router;
