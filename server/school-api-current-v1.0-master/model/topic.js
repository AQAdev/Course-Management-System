const mongoose = require("mongoose");

const Topic = new mongoose.Schema({
  //   present or absent
  // title: {
  //   type: String,
  //   required: true,
  // },
  descriptiopn: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SelectedCourse",
  },
});
module.exports = mongoose.model("Topic", Topic);
