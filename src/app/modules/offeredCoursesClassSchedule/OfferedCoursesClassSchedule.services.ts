/* eslint-disable prefer-const */
import { OfferedCoursesClassSchedule, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  offeredCoursesClassScheduleRelationalFields,
  offeredCoursesClassScheduleRelationalFieldsMapper,
  offeredCoursesClassScheduleSearchAbleFields,
} from './OfferedCoursesClassSchedule.constents';
import { IOfferedCoursesClassScheduleSearchTerm } from './OfferedCoursesClassSchedule.interface';
import { OfferedCourseClassScheduleUtils } from './offeredCoursesClassSchedule.utils';

const insertIntoDb = async (data: OfferedCoursesClassSchedule) => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailable(data);
  await OfferedCourseClassScheduleUtils.checkFacultyAvailable(data);

  const result = await prisma.offeredCoursesClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCoursesSection: true,
      room: true,
      faculty: true,
    },
  });

  return result;
};

const getAllFromDb = async (
  filters: IOfferedCoursesClassScheduleSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCoursesClassSchedule[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCoursesClassScheduleSearchAbleFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCoursesClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCoursesClassScheduleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCoursesClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCoursesClassSchedule.findMany({
    where: whereConditions,
    include: {
      faculty: true,
      semesterRegistration: true,
      room: true,
      offeredCoursesSection: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
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
