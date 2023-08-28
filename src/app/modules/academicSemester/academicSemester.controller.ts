import {Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.insertIntoDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Inserted successfully',
      data: result,
    });
  }
);


const getAllFromDbController = catchAsync(async(req: Request, res: Response)=> {
  const result = await AcademicSemesterServices.getAllFromDb()

  sendResponse(res, {
    statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieve successfully',
      data: result,
  })
})



export const AcademicSemesterController = {
  insertIntoDbController,
  getAllFromDbController
};
