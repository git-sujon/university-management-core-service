import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId is required',
    }),

    coursesIds: z.array(
      z.string({
        required_error: 'course id is required',
      }),
      {
        required_error: 'coursesIds is required',
      }
    ),
  }),
});

export const OfferedCoursesValidation = {
  insertIntoDbValidation,
};
