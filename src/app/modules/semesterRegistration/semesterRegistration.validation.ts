import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
    minCredit: z.number().int().optional(),
    maxCredit: z.number().int().optional(),
    academicSemesterId: z.string({
      required_error: 'Academic semester ID is required',
    }),
  }),
});

const updateFromDbValidation = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
    minCredit: z.number().int().optional(),
    maxCredit: z.number().int().optional(),
    academicSemesterId: z.string().optional(),
  }),
});

export const SemesterRegistrationValidation = {
  insertIntoDbValidation,
  updateFromDbValidation,
};
