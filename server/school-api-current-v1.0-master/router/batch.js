const express = require("express");
const C_C = require("./../controller/batch");
const R_R = express.Router();

R_R.route("/batch").post(C_C.addBatch).get(C_C.getBatch);
module.exports = R_R;
