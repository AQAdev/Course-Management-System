const express = require("express");
const C_C = require("./../controller/topic");
const R_R = express.Router();

R_R.route("/topic").post(C_C.addTopic).get(C_C.getTopic);
R_R.route("/topic/:id").patch(C_C.updateTopicByID).get(C_C.getTopicByID);
module.exports = R_R;
