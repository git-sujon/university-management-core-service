import { z } from 'zod';

const insertIntoDbValidation = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Room Number is required',
    }),
    floor: z.string({
      required_error: 'Title is required',
    }),
   
  }),
});

const updateFromDbValidation = z.object({
  body: z.object({
    roomNumber: z.string().optional(),
    floor: z.string().optional(),
  }),
});

export const RoomValidation = {
  insertIntoDbValidation,
  updateFromDbValidation
};
