const express = require("express");
const C_C = require("./../controller/courses");
const R_R = express.Router();

R_R.route("/courses").post(C_C.addCourse).get(C_C.getCourse);

R_R.route("/coursesbycoursecode").get(C_C.getCourseByCourseCode);

R_R.route("/courses/:id").patch(C_C.updateCourseByID).get(C_C.getCourseByID);
module.exports = R_R;
