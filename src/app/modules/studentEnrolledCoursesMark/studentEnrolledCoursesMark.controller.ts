import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { StudentEnrolledCoursesMarkServices } from "./studentEnrolledCoursesMark.services";

const updateStudentMarksController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
  
    const result = await StudentEnrolledCoursesMarkServices.updateStudentMarks(payload);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Mark updated successfully',
      data: result,
    });
  });

 export const StudentEnrolledCoursesMarksController = {
    updateStudentMarksController
 }