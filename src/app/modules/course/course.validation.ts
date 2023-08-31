import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    credits: z.number({
      required_error: 'Credits is required',
    }),
    preRequisiteCourses: z.array(
        z.object({
          courseId: z.string(),
        })
      ).optional(),
   
  }),
});

const updateFromDbValidation = z.object({
    body: z.object({
      title: z.string().optional(),
      code: z.string().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z.array(
        z.object({
          courseId: z.string(),
        })
      ).optional(),
    }),
  });


  const assignOrRemoveCourses = z.object({
    body:z.object({
      faculties:z.array(z.string(), {
        required_error:"faculties are required"
      })
    })
  })

export const CourseValidation = {
  insertIntoDbValidation,
  updateFromDbValidation,
  assignOrRemoveCourses
};
