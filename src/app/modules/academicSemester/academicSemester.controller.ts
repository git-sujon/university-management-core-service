import {Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';

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

  const filter = pick(req.query, ["searchTerm", "code", "startMonth", "endMonth"])
  const options  = pick (req.query, ["limit", "page", "sortBy", "sortOrder"])





  const result = await AcademicSemesterServices.getAllFromDb(filter, options)
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieve successfully',
      meta:result.meta, 
      data: result.data,
  })
})



export const AcademicSemesterController = {
  insertIntoDbController,
  getAllFromDbController
};
