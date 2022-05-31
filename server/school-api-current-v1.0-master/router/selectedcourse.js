const express = require("express");
const C_C = require("../controller/selectedcourse");
const R_R = express.Router();

R_R.route("/selectedCourse").post(C_C.addCourse).get(C_C.getCourse);
R_R.route("/selectedCours/detials").get(C_C.getCoureseDetailPerReq);
R_R.route("/selectedCours/student").get(C_C.getCoureseDetailStudent);
R_R.route("/selectedCours/studentallcourses").get(C_C.getStudentAllCourese);

R_R.route("/selectedCourse/:id")
  .patch(C_C.updateCourseByID)
  .get(C_C.getCourseByID);
module.exports = R_R;
