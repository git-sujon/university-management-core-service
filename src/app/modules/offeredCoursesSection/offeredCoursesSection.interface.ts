import { WeekDays } from '@prisma/client';

export type IClassSchedules = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
  roomId: string;
  facultyId: string;
};

export type IOfferedCoursesSectionCreate = {
  title: string;
  maxCapacity: number;
  offeredCoursesId: string;
  classSchedules: IClassSchedules[];
};
