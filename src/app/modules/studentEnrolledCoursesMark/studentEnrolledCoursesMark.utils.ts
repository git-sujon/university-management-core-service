const getGradeByMarks = async(marks:number) => {
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

  return grade
}

export const StudentEnrolledCoursesMarkUtils = {
    getGradeByMarks
}