import { PrismaClient, AcademicSemester, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterSearchTerm } from './academicSemester.interface';
import { academicSemesterSearchAbleFields } from './academicSemeter.contents';

const prisma = new PrismaClient();

const insertIntoDb = async (academicSemesterData: AcademicSemester) => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

const getAllFromDb = async (
  filter: IAcademicSemesterSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  console.log("filterData:", filterData)


  let andConditions = [];
  
  if(searchTerm){
    andConditions.push({
      OR:academicSemesterSearchAbleFields.map(filed => ({
        [filed]:{
          contains:searchTerm,
          mode: 'insensitive',
        }
      }))
    })
  }

  if(Object.keys(filterData).length > 0 ) {
    andConditions.push({
      AND:Object.keys(filterData).map(key => ({
        [key]: {
          equals:( filterData as any )[key] 
        }
      }))
    })
  }


  const whereConditions:  Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? {AND:andConditions} : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,

    skip,
    take: limit,
  });
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

export const AcademicSemesterServices = {
  insertIntoDb,
  getAllFromDb,
};
