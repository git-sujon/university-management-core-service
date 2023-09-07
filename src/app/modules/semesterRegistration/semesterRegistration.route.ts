import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SemesterRegistrationValidation.insertIntoDbValidation),
  SemesterRegistrationController.insertIntoDbController
);
router.post(
  '/start-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistrationController
);
router.get('/:id', SemesterRegistrationController.getDataByIDController);
router.get('/', SemesterRegistrationController.getAllFromDbController);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.updateFromDbValidation),
  SemesterRegistrationController.updateDataController
);
router.delete('/:id', SemesterRegistrationController.deleteDataController);

export const SemesterRegistrationRouter = router;
