import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(StudentValidation.insertIntoDbValidation),
  StudentController.insertIntoDbController
);
router.get('/:id', StudentController.getDataByIDController);
router.get('/', StudentController.getAllFromDbController);
router.patch('/:id', StudentController.updateDataController);
router.delete('/:id', StudentController.deleteDataController);

export const StudentRouter = router;
