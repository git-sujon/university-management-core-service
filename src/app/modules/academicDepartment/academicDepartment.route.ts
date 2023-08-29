import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.insertIntoDbValidation),
  AcademicDepartmentController.insertIntoDbController
);
router.get('/:id', AcademicDepartmentController.getDataByIDController);
router.get('/', AcademicDepartmentController.getAllFromDbController);
router.patch('/:id', AcademicDepartmentController.updateDataController);
router.delete('/:id', AcademicDepartmentController.deleteDataController);

export const AcademicDepartmentRouter = router;
