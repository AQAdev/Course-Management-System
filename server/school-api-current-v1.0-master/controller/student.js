const _STUDENT = require("./../model/student");

exports.addStudent = async function (req, res) {
  try {
    console.log("student");
    console.log(req.body);
    const student = await _STUDENT.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        student: student, 
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getAllStudent = async function (req, res) {
  try {
    var students = await _STUDENT.find();

    const total_Students = Object.keys(students).length;

    res.status(201).json({
      status: "success",
      total: total_Students,
      data: {
        students: students,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.getStudentByID = async function (req, res) {
  try {
    var student = await _STUDENT
      .findById(req.params.id)
      .populate("stdSection")
      .populate("stdBatch")
      .populate("stdProgram")
      .populate("memberID");

    res.status(201).json({
      tatus: "success",
      data: {
        student: student,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
// sp10-75

exports.getStudentByRegNo = async function (req, res) {
  try {
    var query = require("url").parse(req.url, true).query;
    console.log(query);
    var student = await _STUDENT
      .find(query)
      .populate("stdSection")
      .populate("stdBatch")
      .populate("stdProgram")
      .populate("memberID");

    res.status(201).json({
      tatus: "success",
      data: {
        student: student,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateStudentByID = async function (req, res) {
  try {
    var student = await _STUDENT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        student: student,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.deleteStudent = async function (req, res) {
  try {
    var student = await _STUDENT.findByIdAndRemove(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        student: student,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
