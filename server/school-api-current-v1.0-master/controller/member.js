const _MEMBER = require("../model/member");
const _ADMIN = require("../model/admin");
const _STUDENT = require("../model/student");
const _TEACHER = require("../model/teacher");

exports.addMember = async function (req, res) {
  try {
    const member = await _MEMBER.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        member: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.allMembers = async function (req, res) {
  try {
    var member = await _MEMBER.find();
    const _member = Object.keys(member).length;

    res.status(201).json({
      status: "success",
      total: _member,
      data: {
        member: member,
      },
    });
    // console.log({ ...admin, role: member[0].role });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
exports.getMemberByNameEmail = async function (req, res) {
  try {
    var member = await _MEMBER.find({
      $and: [{ email: req.query.email }, { password: req.query.password }],
    });

    const _member = Object.keys(member).length;
    console.log(member);
    let admin;
    if (_member === 1) {
      if (member[0].role === "ADMIN") {
        admin = await _ADMIN.find({ memberID: member[0]._id });
      } else if (member[0].role === "STUDENT") {
        admin = await _STUDENT.find({ memberID: member[0]._id });
      } else if (member[0].role === "TEACHER") {
        admin = await _TEACHER.find({ tch_id: member[0]._id });
      }
      console.log(admin);
      res.status(201).json({
        status: "success",
        total: _member,
        data: {
          member: member,
          member_information: admin,
        },
      });
      // console.log({ ...admin, role: member[0].role });
    } else {
      res.status(201).json({
        status: "fail",
        total: _member,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateMember = async function (req, res) {
  try {
    var member = await _MEMBER.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        member: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.deleteMember = async function (req, res) {
  try {
    var member = await _MEMBER.findByIdAndRemove(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        member: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
