/* eslint-disable prefer-const */
import { OfferedCoursesClassSchedule } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { OfferedCourseClassScheduleUtils } from './offeredCoursesClassSchedule.utils';


const insertIntoDb = async (data: OfferedCoursesClassSchedule) => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailable(data)
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(data)


    const result = await prisma.offeredCoursesClassSchedule.create({
        data,
        include: {
            semesterRegistration: true,
            offeredCoursesSection: true,
            room: true,
            faculty: true
        }
    })

    return result;
}

const getAllFromDb = async (
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCoursesClassSchedule[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.offeredCoursesClassSchedule.findMany({
    skip,
    take: limit,
  });
  const total = await prisma.offeredCoursesClassSchedule.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getDataByID = async (
  id: string
): Promise<OfferedCoursesClassSchedule | null> => {
  const result = await prisma.offeredCoursesClassSchedule.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<OfferedCoursesClassSchedule>
): Promise<OfferedCoursesClassSchedule | null> => {
  const result = await prisma.offeredCoursesClassSchedule.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (
  id: string
): Promise<OfferedCoursesClassSchedule | null> => {
  const result = await prisma.offeredCoursesClassSchedule.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OfferedCoursesClassScheduleServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
};
