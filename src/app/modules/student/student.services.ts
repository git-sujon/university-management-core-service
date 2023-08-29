/* eslint-disable prefer-const */
import { Student, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IStudentSearchTerm } from './student.interface';
import { studentSearchAbleFields } from './student.contents';

const insertIntoDb = async (studentData: Student) => {
  const result = await prisma.student.create({
    data: studentData,
  });
  return result;
};

const getAllFromDb = async (
  filter: IStudentSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
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
  const total = await prisma.student.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getDataByID = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<Student>
): Promise<Student | null> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });
  return result;
};

export const StudentServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
};
