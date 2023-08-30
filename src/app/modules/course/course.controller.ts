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

const getAllFromDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CourseServices.getAllFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieve successfully',
      data: result,
    });
  }
);
const getDataByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.getDataById(id);

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
  const result = await CourseServices.updateData(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data update successfully',
    data: result,
  });
});

const deleteDataController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data retrieve successfully',
    data: result,
  });
});

const assignFacultiesController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.faculties;
    const result = await CourseServices.assignFaculties(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course faculty assign  successfully',
      data: result,
    });
  }
);
const deleteAssignFacultiesController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.faculties;
    const result = await CourseServices.deleteAssignFaculties(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course faculty delete  successfully',
      data: result,
    });
  }
);

export const CourseController = {
  insertIntoDbController,
  getAllFromDbController,
  getDataByIdController,
  updateDataController,
  deleteDataController,
  assignFacultiesController,
  deleteAssignFacultiesController
};
