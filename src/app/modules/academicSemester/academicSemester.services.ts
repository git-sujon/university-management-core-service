import { PrismaClient, AcademicSemester } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';

const prisma = new PrismaClient();

const insertIntoDb = async (academicSemesterData: AcademicSemester) => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

const getAllFromDb = async(): Promise<IGenericResponse<AcademicSemester[]>> => {
  const result = await prisma.academicSemester.findMany({});
  const total =await prisma.academicSemester.count();

  return {
    meta: {
      page: 1,
      limit: 10,
      total: total,
    },
    data: result,
  };
};

export const AcademicSemesterServices = {
  insertIntoDb,
  getAllFromDb,
};
