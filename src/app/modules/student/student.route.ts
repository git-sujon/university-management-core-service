import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidation.insertIntoDbValidation),
  StudentController.insertIntoDbController
);
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myCoursesController
);
router.get('/:id', StudentController.getDataByIDController);
router.get('/', StudentController.getAllFromDbController);
router.patch('/:id', StudentController.updateDataController);
router.delete('/:id', StudentController.deleteDataController);

export const StudentRouter = router;
