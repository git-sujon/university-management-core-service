import {
  ExamType,
  PrismaClient,
  StudentEnrolledCoursesMark,
} from '@prisma/client';
import prisma from '../../../shared/prisma';

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

const updateStudentMarks = async (
  payload: Partial<StudentEnrolledCoursesMark>
) => {
  const result = await prisma.studentEnrolledCoursesMark.updateMany({
    where: {
      studentId: payload.studentId,
      studentEnrolledCoursesId: payload.studentEnrolledCoursesId,
      academicSemesterId: payload.academicSemesterId,
      examType: payload.examType,
    },
    data: payload,
  });

  return result;
};

export const StudentEnrolledCoursesMarkServices = {
  createStudentEnrolledCoursesMark,
  updateStudentMarks,
};
