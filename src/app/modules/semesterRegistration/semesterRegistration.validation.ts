import { SemesterRegistrationStatus } from '@prisma/client';
import {  z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    status: z
      .enum([...Object.values(SemesterRegistrationStatus)] as [
        string,
        ...string[]
      ])
      .optional(),
    minCredit: z
      .number({
        required_error: 'minCredit is required',
      })
      .int(),
    maxCredit: z
      .number({
        required_error: 'maxCredit is required',
      })
      .int(),
    academicSemesterId: z.string({
      required_error: 'Academic semester ID is required',
    }),
  }),
});

const updateFromDbValidation = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z
      .enum([...Object.values(SemesterRegistrationStatus)] as [
        string,
        ...string[]
      ])
      .optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    academicSemesterId: z.string().optional(),
  }),
});

export const SemesterRegistrationValidation = {
  insertIntoDbValidation,
  updateFromDbValidation,
};
