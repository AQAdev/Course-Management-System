const express = require("express");
const student_C = require("./../controller/registration-status");
const student_R = express.Router();

student_R.route("/status").get(student_C.getStatus).post(student_C.addStatus);
student_R.route("/status/:id").patch(student_C.updateregistrationStatus);
module.exports = student_R;
