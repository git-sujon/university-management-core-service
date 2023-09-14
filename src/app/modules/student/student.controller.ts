import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentServices } from './student.services';
import { myCoursesFilterAbleFields, studentFilterAbleFields } from './student.contents';

const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentServices.insertIntoDb(req.body);

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
    const filter = pick(req.query, studentFilterAbleFields);
    const options = pick(req.query, paginationFields);

    const result = await StudentServices.getAllFromDb(filter, options);

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

    const result = await StudentServices.getDataByID(id);

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

  const result = await StudentServices.UpdateData(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Update successfully',
    data: result,
  });
});
const myCoursesController = catchAsync(async (req: Request, res: Response) => {
  const authUser = (req as any).user;
  const filters = pick(req.query, myCoursesFilterAbleFields)
  const result = await StudentServices.myCourses(authUser.userId, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses data fetch successfully',
    data: result,
  });
});

const deleteDataController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentServices.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data delete successfully',
    data: result,
  });
});

export const StudentController = {
  insertIntoDbController,
  getAllFromDbController,
  getDataByIDController,
  updateDataController,
  deleteDataController,
  myCoursesController,
};
