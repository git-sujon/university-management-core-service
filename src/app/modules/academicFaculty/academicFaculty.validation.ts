import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    })
  }),
});

export const AcademicFacultyValidation = {
  insertIntoDbValidation,
};
