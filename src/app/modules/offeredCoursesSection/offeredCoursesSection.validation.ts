import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    maxCapacity: z.number({
      required_error: 'maxCapacity is required',
    }),
    currentlyEnrolledStudent: z.number().optional(),
    
   
  }),
});

export const OfferedCoursesSectionValidation = {
  insertIntoDbValidation,
};
