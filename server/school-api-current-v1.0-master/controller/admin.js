const _ADMIN = require("./../model/admin");

exports.addAdmin = async function (req, res) {
  try {
    const admin = await _ADMIN.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        admin: admin,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getAdminByID = async function (req, res) {
  try {
    var admin = await _ADMIN.findById(req.params.id);

    res.status(201).json({
      tatus: "success",
      data: {
        admin: admin,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
