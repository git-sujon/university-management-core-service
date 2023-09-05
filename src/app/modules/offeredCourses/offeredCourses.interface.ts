export type IOfferedCoursesSearchTerm = {
    searchTerm? : string
}


export type ICreateOfferedCourses  = {
    academicDepartmentId:string,
    semesterRegistrationId:string,
    coursesIds:string[]
}