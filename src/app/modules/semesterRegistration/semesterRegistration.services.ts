/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
  StudentSemesterRegistration,
} from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  ICreateStudentSemesterRegistrationCourses,
  ISemesterRegistrationSearchTerm,
} from './semesterRegistration.interface';
import { semesterRegistrationSearchAbleFields } from './semesterRegistration.contents';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { StudentSemesterRegistrationCoursesServices } from '../studentSemesterRegistrationCourses/studentSemesterRegistrationCourses.services';

const insertIntoDb = async (data: SemesterRegistration) => {
  const ISemesterRegistrationUpcomingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });

  if (ISemesterRegistrationUpcomingOrOngoing) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `There is already an ${ISemesterRegistrationUpcomingOrOngoing.status}} registration`
    );
  }

  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};

const getAllFromDb = async (
  filter: ISemesterRegistrationSearchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filter;

  let andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: semesterRegistrationSearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.semesterRegistration.findMany({
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
  const total = await prisma.semesterRegistration.count();

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
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateData = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration | null> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }

  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Can only move to UPCOMING to ONGOING'
    );
  }

  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Can only move to ONGOING to ENDED'
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
  });
  return result;
};

const startMyRegistration = async (
  authUserId: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });

  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const SemesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.ONGOING,
          SemesterRegistrationStatus.UPCOMING,
        ],
      },
    },
  });

  if (!SemesterRegistrationInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No semester is available write now'
    );
  }

  if (
    SemesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Registration is Not Started yet');
  }

  let studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        student: {
          id: studentInfo.id,
        },
        semesterRegistration: {
          id: SemesterRegistrationInfo.id,
        },
      },
    });

  if (!studentSemesterRegistration) {
    studentSemesterRegistration =
      await prisma.studentSemesterRegistration.create({
        data: {
          semesterRegistrationId: SemesterRegistrationInfo?.id,
          studentId: studentInfo?.id,
        },
        include: {
          semesterRegistration: true,
          student: true,
        },
      });
  }

  return {
    semesterRegistration: SemesterRegistrationInfo,
    studentSemesterRegistration: studentSemesterRegistration,
  };
};

const enrollIntoCourses = async (
  authUserId: string,
  payload: ICreateStudentSemesterRegistrationCourses
): Promise<{ message: string }> => {
  return StudentSemesterRegistrationCoursesServices.enrollIntoCourses(
    authUserId,
    payload
  );
};

const withdrawFromCourses = async (
  authUserId: string,
  payload: ICreateStudentSemesterRegistrationCourses
): Promise<{ message: string }> => {
  return StudentSemesterRegistrationCoursesServices.withdrawFromCourses(
    authUserId,
    payload
  );
};

const confirmMyRegistration = async (
  authUserId: string
): Promise<{ message: string }> => {
  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  const studentSemesterRegistrationInfo =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistrationId: semesterRegistrationInfo?.id,
        student: {
          studentId: authUserId,
        },
      },
    });

  if (!studentSemesterRegistrationInfo || !semesterRegistrationInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not recognized for this semester'
    );
  }

  if (
    studentSemesterRegistrationInfo.totalCreditsTaken <
      semesterRegistrationInfo?.minCredit ||
    studentSemesterRegistrationInfo.totalCreditsTaken >
      semesterRegistrationInfo?.maxCredit
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `You credit should be in between ${semesterRegistrationInfo.minCredit} to  ${semesterRegistrationInfo.maxCredit}`
    );
  }
  await prisma.studentSemesterRegistration.update({
    where: {
      id: studentSemesterRegistrationInfo.id,
    },
    data: {
      isConfirmed: true,
    },
  });

  return { message: 'Semester Registration Confirm' };
};

export const SemesterRegistrationServices = {
  insertIntoDb,
  getAllFromDb,
  getDataByID,
  UpdateData,
  deleteData,
  startMyRegistration,
  enrollIntoCourses,
  withdrawFromCourses,
  confirmMyRegistration,
};
