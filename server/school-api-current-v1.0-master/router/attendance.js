const express = require("express");
const C_C = require("./../controller/attendance");
const R_R = express.Router();

R_R.route("/attendance").post(C_C.addAttendance).get(C_C.getAttendance);
R_R.route("/attendance/precentage").get(C_C.getAttendanceInPercent);
R_R.route("/attendance/courseAttendance").get(
  C_C.getStudentCourseAndAttendance
);

R_R.route("/attendance/:id")
  .patch(C_C.updateAttendanceByID)
  .get(C_C.getAttendanceByID);
module.exports = R_R;
