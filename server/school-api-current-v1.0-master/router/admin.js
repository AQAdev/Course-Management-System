const express = require("express");
const admin = require("../model/admin");
const admin_C = require("./../controller/admin");
const admin_R = express.Router();

admin_R.route("/admin").post(admin_C.addAdmin);
admin_R.route("/admin/:id").get(admin_C.getAdminByID);

module.exports = admin_R;
