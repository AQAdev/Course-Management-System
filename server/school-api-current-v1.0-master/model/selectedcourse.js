const mongoose = require("mongoose");

const SelectedCourse = new mongoose.Schema({
  course_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Courses",
  },

  // department: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "department",
  // },
  courseSemester: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Section",
  },
  batch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Batch",
  },
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("SelectedCourse", SelectedCourse);
