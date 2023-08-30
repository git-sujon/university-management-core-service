import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseData } from './course.interface';

const insertIntoDb = async (
  data: ICourseData
): Promise<Partial<ICourseData | null>> => {
  const { preRequisiteCourses, ...othersData } = data;

  const newResult = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: othersData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Create Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; preRequisiteCourses.length > index; index++) {
        await transactionClient.courseTOPrerequisite.create({
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

const getAllFromDb = async (): Promise<Course[]> => {
  const result = await prisma.course.findMany();

  return result;
};

const getDataById = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateData = async (
  id: string,
  payload: Partial<ICourseData>
): Promise<Course | null> => {
  const { preRequisiteCourses, ...othersData } = payload;
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: othersData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Update Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses.filter(
        coursesPrerequisite =>
          coursesPrerequisite.courseId && coursesPrerequisite.isDeleted
      );

      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      for (let index = 0; deletePreRequisite.length > index; index++) {
        await transactionClient.courseTOPrerequisite.deleteMany({
          where: {
            AND: [
              {
                courseId: id,
              },
              {
                prerequisiteId: deletePreRequisite[index].courseId,
              },
            ],
          },
        });
      }

      for (let index = 0; newPrerequisite.length > index; index++) {
        await transactionClient.courseTOPrerequisite.create({
          data: {
            courseId: id,
            prerequisiteId: newPrerequisite[index].courseId,
          },
        });
      }
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
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
};

const deleteData = async (id: string) => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });

  return result;
};

const assignFaculties = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },

    include: {
      course: true,
      faculty: true,
    },
  });

  return assignFacultiesData;
};

const deleteAssignFaculties = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId: id,
      facultyId: {
        in: payload,
      },
    },
  });

  const deleteAssignFacultiesResult = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      course: true,
      faculty: true,
    },
  });

  return deleteAssignFacultiesResult
};

export const CourseServices = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateData,
  deleteData,
  assignFaculties,
  deleteAssignFaculties,
};
