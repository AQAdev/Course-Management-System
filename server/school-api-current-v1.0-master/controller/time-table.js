const _TIMETABLE = require("../model/timetable");

exports.addTimetable = async function (req, res) {
  try {
    const timetable = await _TIMETABLE.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        timetable: timetable,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTimetable = async function (req, res) {
  try {
    const timetable = await _TIMETABLE
      .find()
      .populate("batch")
      .populate("program")
      .populate("section")
      .populate("teacher");

    res.status(201).json({
      status: "success",
      data: {
        timetable: timetable,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.updatetimetable = async function (req, res) {
  try {
    var member = await _TIMETABLE.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        timetable: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.deleteAnnoucment = async function (req, res) {
  try {
    var member = await _TIMETABLE.findByIdAndRemove(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        timetable: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
