const express = require("express");
const C_C = require("./../controller/program");
const R_R = express.Router();

R_R.route("/program").post(C_C.addProgam).get(C_C.getProgam);
module.exports = R_R;
