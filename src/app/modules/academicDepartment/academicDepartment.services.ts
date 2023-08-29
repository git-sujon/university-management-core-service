/* eslint-disable prefer-const */
import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicDepartmentSearchAbleFields} from './academicDepartment.contents';
import { IAcademicDepartmentSearchTerm } from './academicDepartment.interface';

const insertIntoDb = async (academicDepartmentData: AcademicDepartment) => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
  });
  return result;
};

const getAllFromDb = async (
  filter: IAcademicDepartmentSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
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
  const total = await prisma.academicDepartment.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getDataByID = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicDepartmentServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
};
