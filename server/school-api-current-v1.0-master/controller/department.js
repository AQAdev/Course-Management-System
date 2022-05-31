const _DEPARTMENT = require("../model/department");

exports.addDepartment = async function (req, res) {
  try {
    const Department = await _DEPARTMENT.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        department: Department,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getDepartment = async function (req, res) {
  try {
    const Department = await _DEPARTMENT.find();

    res.status(201).json({
      status: "success",
      data: {
        department: Department,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
