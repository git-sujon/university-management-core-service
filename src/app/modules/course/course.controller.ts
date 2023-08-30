import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CourseServices } from './course.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await CourseServices.insertIntoDb(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data inserted successfully',
      data: result,
    });
  }
);


export const CourseController = {
    insertIntoDbController
}