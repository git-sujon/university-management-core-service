/* eslint-disable prefer-const */
import { OfferedCourses, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  ICreateOfferedCourses,
  IOfferedCoursesSearchTerm,
} from './offeredCourses.interface';
import { offeredCoursesSearchAbleFields } from './offeredCourses.contents';
import { asyncForEach } from '../../../shared/utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (
  data: ICreateOfferedCourses
): Promise<OfferedCourses[]> => {
  const result:OfferedCourses[] = [];
  const { academicDepartmentId, semesterRegistrationId, coursesIds } = data;

  await asyncForEach(coursesIds, async (courseId: string) => {
    const isAlreadyExist = await prisma.offeredCourses.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if(isAlreadyExist){
      throw new ApiError(httpStatus.BAD_REQUEST, "courses are already exist")
    }

    if (!isAlreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourses.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include:{
          academicDepartment:true,
          semesterRegistration:true,
          course:true
        }
      });

      result.push(insertOfferedCourse);
    }
  });

  return result;
};

const getAllFromDb = async (
  filter: IOfferedCoursesSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourses[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCoursesSearchAbleFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.OfferedCoursesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourses.findMany({
    where: whereConditions,
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
  const total = await prisma.offeredCourses.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getDataByID = async (id: string): Promise<OfferedCourses | null> => {
  const result = await prisma.offeredCourses.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<OfferedCourses>
): Promise<OfferedCourses | null> => {
  const result = await prisma.offeredCourses.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<OfferedCourses | null> => {
  const result = await prisma.offeredCourses.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OfferedCoursesServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
};
