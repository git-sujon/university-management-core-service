import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.services';
import { academicFacultyFilterAbleFields } from './academicFaculty.contents';


const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.insertIntoDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Inserted successfully',
      data: result,
    });
  }
);

const getAllFromDbController = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, academicFacultyFilterAbleFields);
    const options = pick(req.query, paginationFields);

    const result = await AcademicFacultyServices.getAllFromDb(filter, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieve successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataByIDController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AcademicFacultyServices.getDataByID(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieve successfully',
      data: result,
    });
  }
);
const updateDataController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await AcademicFacultyServices.UpdateData(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Update successfully',
    data: result,
  });
});

const deleteDataController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AcademicFacultyServices.deleteData(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data delete successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  insertIntoDbController,
  getAllFromDbController,
  getDataByIDController,
  updateDataController,
  deleteDataController
};
