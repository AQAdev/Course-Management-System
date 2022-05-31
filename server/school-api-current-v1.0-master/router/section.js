const express = require("express");
const C_C = require("./../controller/section");
const R_R = express.Router();

R_R.route("/section").post(C_C.addSection).get(C_C.getSection);
module.exports = R_R;
