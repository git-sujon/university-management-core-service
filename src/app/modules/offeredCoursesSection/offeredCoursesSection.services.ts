/* eslint-disable prefer-const */
import { OfferedCoursesSection } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { asyncForEach } from '../../../shared/utils';
import { OfferedCourseClassScheduleUtils } from '../offeredCoursesClassSchedule/offeredCoursesClassSchedule.utils';
import { IClassSchedules, IOfferedCoursesSectionCreate } from './offeredCoursesSection.interface';

const insertIntoDb = async (
  payload: IOfferedCoursesSectionCreate
): Promise<OfferedCoursesSection | null> => {
  const { classSchedules, ...data } = payload;

  const isExistOfferedCourses = await prisma.offeredCourses.findUnique({
    where: {
      id: data.offeredCoursesId,
    },
  });

  if (!isExistOfferedCourses) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OfferedCourses Not Found');
  }

  

  await asyncForEach(classSchedules, async (schedule: any) => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailable(schedule);
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(schedule);
  });

  const offerCourseSectionData = await prisma.offeredCoursesSection.findFirst({
    where: {
      offeredCourses: {
        id: data.offeredCoursesId,
      },
      title: data.title,
    },
  });

  if (offerCourseSectionData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courses section already exist');
  }

  const createSection = await prisma.$transaction(
    async offerCourseSectionTransaction => {
      const createOfferCourseSection =
        await offerCourseSectionTransaction.offeredCoursesSection.create({
          data:{
            title:data.title,
            maxCapacity:data.maxCapacity,
            offeredCoursesId:data.offeredCoursesId,
            semesterRegistrationId:isExistOfferedCourses.semesterRegistrationId
          },
        });

      const scheduleData = classSchedules.map((schedule: IClassSchedules) => ({
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        dayOfWeek: schedule.dayOfWeek,
        roomId: schedule.roomId,
        facultyId: schedule.facultyId,
        offeredCoursesSectionId: createOfferCourseSection.id,
        semesterRegistrationId: isExistOfferedCourses.semesterRegistrationId,
      }));

      await offerCourseSectionTransaction.offeredCoursesClassSchedule.createMany(
        {
          data: scheduleData,
        }
      );

      return createOfferCourseSection;
    }
  );

  const result = await prisma.offeredCoursesSection.findFirst({
    where: {
      id: createSection.id,
    },
    include: {
      offeredCourses: {
        include: {
          course: true,
        },
      },
      offeredCoursesClassSchedules: {
        include: {
          room: {
            include: {
              building: true,
            },
          },
          faculty: true,
        },
      },
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
