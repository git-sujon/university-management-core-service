import { PrismaClient } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createSemesterPayment = async (
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
    academicSemesterId: string;
    fullPaymentAmount: number;
  }
) => {
  const isStudentSemesterPaymentExist =
    await prisma.studentSemesterPayment.findFirst({
      where: {
        student: {
          id: payload.studentId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isStudentSemesterPaymentExist) {
    await prisma.studentSemesterPayment.create({
      data: {
        ...payload,
        partialPaymentAmount: payload.fullPaymentAmount * 0.5,
        totalDueAmount: payload.fullPaymentAmount,
        totalPaidAmount: 0,
      },
    });


  }
};

export const StudentSemesterPaymentServices = {
  createSemesterPayment,
};
