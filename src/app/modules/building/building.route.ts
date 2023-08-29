import express from 'express';
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidation } from './building.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingValidation.insertIntoDbValidation),
  BuildingController.insertIntoDbController
);
router.get('/:id', BuildingController.getDataByIDController);
router.get('/', BuildingController.getAllFromDbController);
router.patch('/:id', BuildingController.updateDataController);
router.delete('/:id', BuildingController.deleteDataController);

export const BuildingRouter = router;
