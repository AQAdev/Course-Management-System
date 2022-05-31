const express = require("express");
const C_C = require("./../controller/teacher");
const R_R = express.Router();

R_R.route("/teacher").post(C_C.addTeacher).get(C_C.getTeacher);
R_R.route("/teacher/courses").get(C_C.getTeacherCoursesBySession);
R_R.route("/teacher/:id").patch(C_C.updateTeacherByID).get(C_C.getTeacherByID);
module.exports = R_R;
