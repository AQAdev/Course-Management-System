const express = require("express");
const announcment_C = require("./../controller/announcemment");
const announcment_R = express.Router();

announcment_R
  .route("/announcemment")
  .post(announcment_C.addAnnouncment)
  .get(announcment_C.getAnnouncment);

announcment_R
  .route("/announcemment/:id")
  .patch(announcment_C.updateAnnouncment)
  .delete(announcment_C.deleteAnnoucment);

module.exports = announcment_R;
