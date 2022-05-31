const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  memberID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Member",
  },
});
module.exports = mongoose.model("Admin", Admin);
