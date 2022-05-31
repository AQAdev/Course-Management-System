const _REGISTRATION_STATUS = require("./../model/registration-status");

exports.addStatus = async function (req, res) {
  try {
    const registration = await _REGISTRATION_STATUS.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        registration: registration,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getStatus = async function (req, res) {
  try {
    var registration = await _REGISTRATION_STATUS.find();

    res.status(201).json({
      tatus: "success",
      data: {
        registration: registration,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateregistrationStatus = async function (req, res) {
  try {
    var registration = await _REGISTRATION_STATUS.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      data: {
        registration: registration,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
