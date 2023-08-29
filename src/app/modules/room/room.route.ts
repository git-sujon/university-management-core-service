import express from 'express';
import { RoomController } from './room.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(RoomValidation.insertIntoDbValidation),
  RoomController.insertIntoDbController
);
router.get('/:id', RoomController.getDataByIDController);
router.get('/', RoomController.getAllFromDbController);
router.patch(
  '/:id',
  validateRequest(RoomValidation.updateFromDbValidation),
  RoomController.updateDataController
);
router.delete('/:id', RoomController.deleteDataController);

export const RoomRouter = router;
