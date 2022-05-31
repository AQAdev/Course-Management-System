const express = require("express");
const scholership_C = require("./../controller/scholership");
const scholership_R = express.Router();

scholership_R
  .route("/scholership")
  .post(scholership_C.addScholership)
  .get(scholership_C.getScholership);

scholership_R
  .route("/scholership/:id")
  .patch(scholership_C.updateScholerrship)
  .delete(scholership_C.deleteScholerrship);

module.exports = scholership_R;
