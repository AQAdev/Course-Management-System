const express = require("express");
const C_C = require("./../controller/department");
const R_R = express.Router();

R_R.route("/department").post(C_C.addDepartment).get(C_C.getDepartment);
module.exports = R_R;
