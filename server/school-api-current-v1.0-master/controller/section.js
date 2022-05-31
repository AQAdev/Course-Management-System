const _Section = require("../model/section");

exports.addSection = async function (req, res) {
  try {
    console.log(req.body);
    const Section = await _Section.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        section: Section,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getSection = async function (req, res) {
  try {
    const Section = await _Section.find();

    res.status(201).json({
      status: "success",
      data: {
        section: Section,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
