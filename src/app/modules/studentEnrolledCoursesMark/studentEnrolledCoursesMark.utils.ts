import { Course, StudentEnrolledCourses } from '@prisma/client';


const getGradeByMarks = async (marks: number) => {
  let grade = '';

  if (marks >= 0 && marks <= 39) {
    grade = 'F';
  } else if (marks >= 40 && marks <= 49) {
    grade = 'E';
  } else if (marks >= 50 && marks <= 54) {
    grade = 'D+';
  } else if (marks >= 55 && marks <= 59) {
    grade = 'C-';
  } else if (marks >= 60 && marks <= 64) {
    grade = 'C';
  } else if (marks >= 65 && marks <= 69) {
    grade = 'C+';
  } else if (marks >= 70 && marks <= 74) {
    grade = 'B-';
  } else if (marks >= 75 && marks <= 79) {
    grade = 'B';
  } else if (marks >= 80 && marks <= 84) {
    grade = 'B+';
  } else if (marks >= 85 && marks <= 89) {
    grade = 'A-';
  } else if (marks >= 90 && marks <= 100) {
    grade = 'A';
  }

  return grade;
};
const getPointsByMarks = async (marks: number) => {
  let point = 0.0;

  if (marks >= 0 && marks <= 39) {
    point = 0.0;
  } else if (marks >= 40 && marks <= 49) {
    point = 1.0;
  } else if (marks >= 50 && marks <= 54) {
    point = 2.0;
  } else if (marks >= 55 && marks <= 59) {
    point = 2.5;
  } else if (marks >= 60 && marks <= 64) {
    point = 3.0;
  } else if (marks >= 65 && marks <= 69) {
    point = 3.5;
  } else if (marks >= 70 && marks <= 74) {
    point = 3.75;
  } else if (marks >= 75 && marks <= 79) {
    point = 4.0;
  } else if (marks >= 80 && marks <= 84) {
    point = 4.0;
  } else if (marks >= 85 && marks <= 89) {
    point = 4.0;
  } else if (marks >= 90 && marks <= 100) {
    point = 4.0;
  }

  return point;
};

const calculateTotalCgpaAndGrade = async (
  payload: (StudentEnrolledCourses & {
    course: Course;
  })[]
) => {



  if (payload.length === 0) {
   return  {
      totalCompletedCredit:0,
      cgpa:0
    }
  }

  let totalCredit = 0;
  let totalCGPA = 0;
  for(const grade of payload){
    totalCGPA += grade.point ||0
    totalCredit += grade.course.credits ||0
  }

  const avgCGPA = Number((totalCGPA / payload.length).toFixed(2))

  console.log("avgCGPA:", avgCGPA)


  return {
    totalCompletedCredit:totalCredit,
    cgpa:avgCGPA
  }


};

export const StudentEnrolledCoursesMarkUtils = {
  getGradeByMarks,
  getPointsByMarks,
  calculateTotalCgpaAndGrade
};
