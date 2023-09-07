export const offeredCoursesClassScheduleSearchAbleFields = ['dayOfWeek'];
export const offeredCoursesClassScheduleRelationalFields = [
  'offeredCoursesSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];

export const offeredCoursesClassScheduleRelationalFieldsMapper:{[key:string]:string} = {
  offeredCoursesSectionId: 'offeredCoursesSection',
  semesterRegistrationId: 'semesterRegistration',
  roomId: 'room',
  facultyId: 'faculty',
};


export const offeredCourseClassScheduleFilterableFields = [
    'searchTerm',
    'dayOfWeek',
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'roomId',
    'facultyId'
]