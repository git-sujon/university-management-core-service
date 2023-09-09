import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ICreateStudentSemesterRegistrationCourses } from '../semesterRegistration/semesterRegistration.interface';
import prisma from '../../../shared/prisma';
import { SemesterRegistrationStatus } from '@prisma/client';

const enrollIntoCourses = async (
  authUserId: string,
  payload: ICreateStudentSemesterRegistrationCourses
): Promise<{ message: string }> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });

  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  }

  const SemesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  if (!SemesterRegistrationInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No SemesterRegistration is ONGOING right now '
    );
  }
  const offeredCoursesInfo = await prisma.offeredCourses.findFirst({
    where: {
      id: payload.offeredCoursesId,
    },
    include: {
      course: true,
    },
  });

  if (!offeredCoursesInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourses Not found');
  }
  const offeredCoursesSectionInfo =
    await prisma.offeredCoursesSection.findFirst({
      where: {
        id: payload.offeredCoursesSectionId,
      },
    });

  if (!offeredCoursesSectionInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCoursesSection Not found');
  }

  if (
    offeredCoursesSectionInfo.maxCapacity &&
    offeredCoursesSectionInfo.currentlyEnrolledStudent &&
    offeredCoursesSectionInfo.currentlyEnrolledStudent >=
      offeredCoursesSectionInfo.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student Capacity is full');
  }

  await prisma.$transaction(async enrollIntoCoursesTransaction => {
    await enrollIntoCoursesTransaction.studentSemesterRegistrationCourses.create(
      {
        data: {
          semesterRegistrationId: SemesterRegistrationInfo?.id,
          studentId: studentInfo?.id,
          offeredCoursesId: payload.offeredCoursesId,
          offeredCoursesSectionId: payload.offeredCoursesSectionId,
        },
      }
    );

    await enrollIntoCoursesTransaction.offeredCoursesSection.update({
      where: {
        id: payload.offeredCoursesSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });

    await enrollIntoCoursesTransaction.studentSemesterRegistration.updateMany({
      where: {
        semesterRegistrationId: SemesterRegistrationInfo.id,
        studentId: studentInfo.id,
      },
      data: {
        totalCreditsTaken: {
          increment: offeredCoursesInfo?.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully Enroll Into the course',
  };
};

const withdrawFromCourses = async (
  authUserId: string,
  payload: ICreateStudentSemesterRegistrationCourses
): Promise<{ message: string }> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });

  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  }

  const SemesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  if (!SemesterRegistrationInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No SemesterRegistration is ONGOING right now '
    );
  }
  const offeredCoursesInfo = await prisma.offeredCourses.findFirst({
    where: {
      id: payload.offeredCoursesId,
    },
    include: {
      course: true,
    },
  });

  if (!offeredCoursesInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourses Not found');
  }

  await prisma.$transaction(async enrollIntoCoursesTransaction => {
    await enrollIntoCoursesTransaction.studentSemesterRegistrationCourses.delete(
      {
        where: {
          semesterRegistrationId_studentId_offeredCoursesId: {
            semesterRegistrationId: SemesterRegistrationInfo.id,
            studentId: studentInfo.id,
            offeredCoursesId: payload.offeredCoursesId,
          },
        },
      }
    );

    await enrollIntoCoursesTransaction.offeredCoursesSection.update({
      where: {
        id: payload.offeredCoursesSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });

    await enrollIntoCoursesTransaction.studentSemesterRegistration.updateMany({
      where: {
        semesterRegistrationId: SemesterRegistrationInfo.id,
        studentId: studentInfo.id,
      },
      data: {
        totalCreditsTaken: {
          decrement: offeredCoursesInfo?.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully Withdraw from the course',
  };
};

export const StudentSemesterRegistrationCoursesServices = {
  enrollIntoCourses,
  withdrawFromCourses,
};
