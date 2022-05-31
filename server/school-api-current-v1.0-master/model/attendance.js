const mongoose = require("mongoose");

const Attendance = new mongoose.Schema({
  //   present or absent

  date: {
    type: String,
    required: true,
  },
  courseSemester: {
    type: String,
    required: true,
  },
  creditHour: {
    type: String,
    required: true,
  },
  // section: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Section",
  // },
  // batch: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Batch",
  // },
  // program: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Program",
  // },
  // teacher: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Teacher",
  // },

  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SelectedCourse",
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
  },
  topic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Topic",
  },
});
module.exports = mongoose.model("Attendance", Attendance);
