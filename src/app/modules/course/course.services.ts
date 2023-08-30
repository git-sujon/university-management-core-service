import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import { ICourseData } from './course.interface';

const insertIntoDb = async (data: ICourseData):Promise<Partial<ICourseData |null>> => {
  const { preRequisiteCourses, ...othersData } = data;

  const newResult = await prisma.$transaction(async () => {
    const result = await prisma.course.create({
      data: othersData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Create Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; preRequisiteCourses.length > index; index++) {
        await prisma.courseTOPrerequisite.create({
          data: {
            courseId: result.id,
            prerequisiteId: preRequisiteCourses[index].courseId,
          },
        });
      }
    }

    return result;
  });

  if (newResult) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newResult.id,
      },
      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        PreRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Create Course');
};

export const CourseServices = {
  insertIntoDb,
};
