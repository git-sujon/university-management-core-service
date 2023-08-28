import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router =  express.Router()

router.post('/', validateRequest(AcademicFacultyValidation.insertIntoDbValidation), AcademicFacultyController.insertIntoDbController)
router.get('/:id', AcademicFacultyController.getDataByIDController)
router.get('/', AcademicFacultyController.getAllFromDbController)
router.patch('/:id', AcademicFacultyController.updateDataController)
router.delete('/:id', AcademicFacultyController.deleteDataController)


export const AcademicFacultyRouter = router