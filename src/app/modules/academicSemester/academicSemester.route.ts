import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router =  express.Router()

router.post('/', validateRequest(AcademicSemesterValidation.insertIntoDbValidation), AcademicSemesterController.insertIntoDbController)
router.get('/:id', AcademicSemesterController.getDataByIDController)
router.get('/', AcademicSemesterController.getAllFromDbController)
router.patch('/:id', AcademicSemesterController.updateDataController)
router.delete('/:id', AcademicSemesterController.deleteDataController)


export const AcademicSemesterRouter = router