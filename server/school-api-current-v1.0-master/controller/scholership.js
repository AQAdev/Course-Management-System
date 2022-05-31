const _SCHOLERSHIP = require("../model/scholership");
const _Student = require("../model/student")
const nodemailer = require("nodemailer");

exports.addScholership = async function (req, res) {
  try {
    console.log(req.body);
    const student = await _Student.find({})
    const scholership = await _SCHOLERSHIP.create(req.body);

    let email = []
    for (let i=0; i<student?.length;i++){
      email.push(student[i]?.stdAddress)
    }

    console.log(email)
    if (email?.length){

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'YOUR_EMAIL',
          pass: ''
        }
      });
      
      for (let i=0; i< email.length;i++){
        
        console.log(email[i]);
        var mailOptions = {
          from: 'YOUR_EMAIL',
          to: email[i],
          subject: 'New Scholarship added',
          text: 'Please Check your CMS Account to view Scholarship'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }
    res.status(201).json({
      status: "success",
      data: {
        scholership: scholership,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getScholership = async function (req, res) {
  try {
    const scholership = await _SCHOLERSHIP.find();

    res.status(201).json({
      status: "success",
      data: {
        scholership: scholership,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.updateScholerrship = async function (req, res) {
  try {
    var member = await _SCHOLERSHIP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        scholership: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.deleteScholerrship = async function (req, res) {
  try {
    var member = await _SCHOLERSHIP.findByIdAndRemove(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        scholership: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
