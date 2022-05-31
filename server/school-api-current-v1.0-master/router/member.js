const express = require("express");
const member_C = require("./../controller/member");
const member_R = express.Router();

member_R
  .route("/member")
  .post(member_C.addMember)
  .get(member_C.getMemberByNameEmail);

member_R.route("/allMembers").get(member_C.allMembers);

member_R
  .route("/member/:id")
  .patch(member_C.updateMember)
  .delete(member_C.deleteMember);
module.exports = member_R;
