const express = require("express");
const student_C = require("./../controller/student");
const student_R = express.Router();

student_R
  .route("/student")
  .post(student_C.addStudent)
  .get(student_C.getAllStudent);

student_R.route("/student/search").get(student_C.getStudentByRegNo);

student_R
  .route("/student/:id")
  .get(student_C.getStudentByID)
  .patch(student_C.updateStudentByID)
  .delete(student_C.deleteStudent);
module.exports = student_R;
