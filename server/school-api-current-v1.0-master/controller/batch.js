const _BATCH = require("../model/batch");

exports.addBatch = async function (req, res) {
  try {
    const Batch = await _BATCH.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        batch: Batch,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getBatch = async function x(req, res) {
  try {
    const Batch = await _BATCH.find();
    console.log(Batch?.length)

    res.status(201).json({
      status: "success",
      data: {
        batch: Batch,
      },
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
