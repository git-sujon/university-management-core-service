import { WeekDays } from '@prisma/client';
import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    startTime: z.string({
      required_error: 'startTime is required',
    }),
    endTime: z.string({
      required_error: 'endTime is required',
    }),
    dayOfWeek: z.enum([...Object.values(WeekDays)] as [string, ...string[]], {
      required_error:
        'Pick one from  Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    }),

    offeredCoursesSectionId: z.string({
      required_error: 'offeredCoursesSectionId is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId is required',
    }),
    roomId: z.string({
      required_error: 'roomId is required',
    }),
    facultyId: z.string({
      required_error: 'facultyId is required',
    }),
  }),
});

export const OfferedCoursesClassScheduleValidation = {
  insertIntoDbValidation,
};
