import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: 'Student ID is required',
    }),
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z.string({
      required_error: 'Last Name is required',
    }),
    profileImage: z.string({
      required_error: 'Profile Image URL is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    bloodGroup: z.string({
      required_error: 'Blood Group is required',
    }),
    designation: z.string({
      required_error: 'Designation is required',
    }),
  }),
});

export const FacultyValidation = {
  insertIntoDbValidation,
};
