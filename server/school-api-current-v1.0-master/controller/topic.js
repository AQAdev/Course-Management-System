const _TOPIC = require("../model/topic");

exports.addTopic = async function (req, res) {
  try {
    const Topic = await _TOPIC.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        topic: Topic,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTopic = async function (req, res) {
  try {
    var query = require("url").parse(req.url, true).query;
    console.log(query);

    const Topic = await _TOPIC.find(query);
    res.status(201).json({
      status: "success",
      data: {
        topic: Topic,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getTopicByID = async function (req, res) {
  try {
    var Topic = await _TOPIC.findById(req.params.id);
    res.status(201).json({
      tatus: "success",
      data: {
        topic: Topic,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateTopicByID = async function (req, res) {
  try {
    var Topic = await _TOPIC.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        topic: Topic,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
