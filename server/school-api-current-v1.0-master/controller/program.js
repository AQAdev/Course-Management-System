const _PROGRAM = require("../model/program");

exports.addProgam = async function (req, res) {
  try {
    const Progam = await _PROGRAM.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        progam: Progam,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getProgam = async function (req, res) {
  try {
    const Progam = await _PROGRAM.find();

    res.status(201).json({
      status: "success",
      data: {
        progam: Progam,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
