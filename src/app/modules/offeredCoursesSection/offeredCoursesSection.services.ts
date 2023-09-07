/* eslint-disable prefer-const */
import { OfferedCoursesSection } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (data: OfferedCoursesSection) => {
  const isExistOfferedCourses = await prisma.offeredCourses.findUnique({
    where: {
      id: data.offeredCoursesId,
    },
  });

  if (!isExistOfferedCourses) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OfferedCourses Not Found');
  }

  const result = await prisma.offeredCoursesSection.create({
    data: {
      ...data,
      semesterRegistrationId: isExistOfferedCourses.semesterRegistrationId,
    },
  });
  return result;
};

const getAllFromDb = async (
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCoursesSection[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.offeredCoursesSection.findMany({
    skip,
    take: limit,
  });
  const total = await prisma.offeredCoursesSection.count();

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
): Promise<OfferedCoursesSection | null> => {
  const result = await prisma.offeredCoursesSection.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<OfferedCoursesSection>
): Promise<OfferedCoursesSection | null> => {
  const result = await prisma.offeredCoursesSection.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (
  id: string
): Promise<OfferedCoursesSection | null> => {
  const result = await prisma.offeredCoursesSection.delete({
    where: {
      id,
    },
  });
  return result;
};

export const offeredCoursesSectionServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
};
