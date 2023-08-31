import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterAbleFields } from './faculty.contents';
import { FacultyServices } from './faculty.services';



const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FacultyServices.insertIntoDb(req.body);

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
    const filter = pick(req.query, facultyFilterAbleFields);
    const options = pick(req.query, paginationFields);

    const result = await FacultyServices.getAllFromDb(filter, options);

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

    const result = await FacultyServices.getDataByID(id);

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

  const result = await FacultyServices.UpdateData(id, payload);

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

    const result = await FacultyServices.deleteData(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data delete successfully',
      data: result,
    });
  }
);


const assignCoursesController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.courses;
    const result = await FacultyServices.assignCourses(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Assign Faculty courses  successfully',
      data: result,
    });
  }
);
const deleteAssignCoursesController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.courses;
    const result = await FacultyServices.deleteAssignCourses(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Faculty courses  successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  insertIntoDbController,
  getAllFromDbController,
  getDataByIDController,
  updateDataController,
  deleteDataController,
  assignCoursesController,
  deleteAssignCoursesController
};
