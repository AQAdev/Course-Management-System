const _TEACHER = require("../model/teacher");

exports.addTeacher = async function (req, res) {
  try {
    const Teacher = await _TEACHER.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        teacher: Teacher,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTeacher = async function (req, res) {
  try {
    const Teacher = await _TEACHER.find();
    console.log(Teacher)


    res.status(201).json({
      status: "success",
      data: {
        teacher: Teacher,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTeacherCoursesBySession = async function (req, res) {
  try {
    var query = require("url").parse(req.url, true).query;
    // var query = url_parts.query;
    console.log(query);
    const Teacher = await _TEACHER.find({ query });
    console.log(Teacher);
    res.status(201).json({
      status: "success",
      data: {
        teacher: Teacher,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTeacherByID = async function (req, res) {
  try {
    var Teacher = await _TEACHER.findById(req.params.id).populate("tch_id");
    res.status(201).json({
      tatus: "success",
      data: {
        teacher: Teacher,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateTeacherByID = async function (req, res) {
  try {
    var Teacher = await _TEACHER.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        teacher: Teacher,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
