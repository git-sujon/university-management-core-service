import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router =  express.Router()

router.post('/', validateRequest(AcademicSemesterValidation.insertIntoDbValidation), AcademicSemesterController.insertIntoDbController)
router.get('/', AcademicSemesterController.getAllFromDbController)

export const AcademicSemesterRouter = router