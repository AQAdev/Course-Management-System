const express = require("express");
const announcment_C = require("./../controller/time-table");
const announcment_R = express.Router();

announcment_R
  .route("/timetable")
  .post(announcment_C.addTimetable)
  .get(announcment_C.getTimetable);

announcment_R
  .route("/timetable/:id")
  .patch(announcment_C.updatetimetable)
  .delete(announcment_C.deleteAnnoucment);

module.exports = announcment_R;
