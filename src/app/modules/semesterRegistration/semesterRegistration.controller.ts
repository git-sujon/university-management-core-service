import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.services';
import { semesterRegistrationFilterAbleFields } from './semesterRegistration.contents';

const insertIntoDbController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationServices.insertIntoDb(req.body);

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
    const filter = pick(req.query, semesterRegistrationFilterAbleFields);
    const options = pick(req.query, paginationFields);

    const result = await SemesterRegistrationServices.getAllFromDb(
      filter,
      options
    );

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

    const result = await SemesterRegistrationServices.getDataByID(id);

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

  const result = await SemesterRegistrationServices.UpdateData(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Update successfully',
    data: result,
  });
});

const deleteDataController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SemesterRegistrationServices.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data delete successfully',
    data: result,
  });
});

const startMyRegistrationController = catchAsync(
  async (req: Request, res: Response) => {
    const userData = (req as any).user;

    const result = await SemesterRegistrationServices.startMyRegistration(
      userData.userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Inserted successfully',
      data: result,
    });
  }
);
const enrollIntoCoursesController = catchAsync(
  async (req: Request, res: Response) => {
    const userData = (req as any).user;
    const payload = req.body
    const result = await SemesterRegistrationServices.enrollIntoCourses(
      userData.userId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration courses enroll successfully',
      data: result,
    });
  }
);
const withdrawFromCoursesController = catchAsync(
  async (req: Request, res: Response) => {
    const userData = (req as any).user;
    const payload = req.body
    const result = await SemesterRegistrationServices.withdrawFromCourses(
      userData.userId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration courses withdraw successfully',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  insertIntoDbController,
  getAllFromDbController,
  getDataByIDController,
  updateDataController,
  deleteDataController,
  startMyRegistrationController,
  enrollIntoCoursesController,
  withdrawFromCoursesController
};
