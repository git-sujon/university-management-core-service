/* eslint-disable prefer-const */
import { Prisma, Faculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { facultySearchAbleFields } from './faculty.contents';
import { IFacultySearchTerm } from './faculty.interface';

const insertIntoDb = async (facultyData: Faculty) => {
  const result = await prisma.faculty.create({
    data: facultyData,
  });
  return result;
};

const getAllFromDb = async (
  filter: IFacultySearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: facultySearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
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
  const total = await prisma.faculty.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getDataByID = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty | null> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
  });
  return result;
};



const assignCourses = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },

    include: {
      faculty: true,
      course: true,
    },
  });

  return assignFacultiesData;
};

const deleteAssignCourses = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });

  const deleteAssignCoursesResult = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      faculty: true,
      course: true,
    },
  });

  return deleteAssignCoursesResult
};


export const FacultyServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
  assignCourses,
  deleteAssignCourses
};
