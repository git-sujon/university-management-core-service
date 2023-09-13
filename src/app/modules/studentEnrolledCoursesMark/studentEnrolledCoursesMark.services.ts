import { ExamType, PrismaClient, StudentEnrolledCoursesStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { StudentEnrolledCoursesMarkUtils } from './studentEnrolledCoursesMark.utils';

const createStudentEnrolledCoursesMark = async (
  startNewSemesterTransaction: Omit<
    PrismaClient<
      {
        errorFormat: 'pretty';
      },
      never
    >,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCoursesId: string;
    academicSemesterId: string;
  }
) => {
  const isExistMidtermData = await prisma.studentEnrolledCoursesMark.findFirst({
    where: {
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourses: {
        id: payload.studentEnrolledCoursesId,
      },

      academicSemester: {
        id: payload.academicSemesterId,
      },
      examType: ExamType.MIDTERM,
    },
  });

  if (!isExistMidtermData) {
    await prisma.studentEnrolledCoursesMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourses: {
          connect: {
            id: payload.studentEnrolledCoursesId,
          },
        },

        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.MIDTERM,
      },
    });
  }
  const isExistFinalData = await prisma.studentEnrolledCoursesMark.findFirst({
    where: {
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourses: {
        id: payload.studentEnrolledCoursesId,
      },

      academicSemester: {
        id: payload.academicSemesterId,
      },
      examType: ExamType.FINAL,
    },
  });

  if (!isExistFinalData) {
    await prisma.studentEnrolledCoursesMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourses: {
          connect: {
            id: payload.studentEnrolledCoursesId,
          },
        },

        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }
};

const updateStudentMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId, marks, examType } = payload;

  const studentEnrolledCoursesMarkInfo =
    await prisma.studentEnrolledCoursesMark.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourses: {
          course: {
            id: courseId,
          },
        },
        examType,
      },
    });

  if (!studentEnrolledCoursesMarkInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'enroll course marks not found');
  }

  const grade = await StudentEnrolledCoursesMarkUtils.getGradeByMarks(marks);

  const updateMarks = await prisma.studentEnrolledCoursesMark.update({
    where: {
      id: studentEnrolledCoursesMarkInfo.id,
    },
    data: {
      marks,
      grade,
    },
  });

  return updateMarks;
};

const updateTotalMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId } = payload;
  const studentEnrolledCoursesInfo =
    await prisma.studentEnrolledCourses.findFirst({
      where: {
        studentId,
        academicSemesterId,
        courseId,
      },
    });
  if (!studentEnrolledCoursesInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enroll course not found'
    );
  }

  const studentEnrolledCoursesMarks =
    await prisma.studentEnrolledCoursesMark.findMany({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourses: {
          course: {
            id: courseId,
          },
        },
      },
    });


    if (!studentEnrolledCoursesMarks.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enroll course marks not found'
    );
  }

  const midtermMark = studentEnrolledCoursesMarks.find((item => item.examType === "MIDTERM"))?.marks ||0
  const finalMark = studentEnrolledCoursesMarks.find((item => item.examType === "FINAL"))?.marks || 0

const totalMarks = Math.ceil(midtermMark * 0.4 + finalMark * 0.6)

const grade = await StudentEnrolledCoursesMarkUtils.getGradeByMarks(totalMarks)
const point = await StudentEnrolledCoursesMarkUtils.getPointsByMarks(totalMarks)





    const result = await prisma.studentEnrolledCourses.updateMany({
      where: {
        studentId,
        academicSemesterId,
        courseId,
      },
      data:{
        grade,
        point,
        totalMarks,
        status:StudentEnrolledCoursesStatus.COMPLETED
      }
    })

 return result
};

export const StudentEnrolledCoursesMarkServices = {
  createStudentEnrolledCoursesMark,
  updateStudentMarks,
  updateTotalMarks,
};
