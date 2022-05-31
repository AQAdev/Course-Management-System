const _ANNOUNCEMENT = require("../model/announcemment");
const _Student = require("../model/student")
const nodemailer = require("nodemailer");

exports.addAnnouncment = async function (req, res) {
  try {
    console.log("abc")
    console.log(req.body);
    const student = await _Student.find({})
    const announcment = await _ANNOUNCEMENT.create(req.body);
    // console.log(student)
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
          pass: 'YOUR_PASSWORD'
        }
      });
      
      for (let i=0; i< email.length;i++){
        
        console.log(email[i]);
        var mailOptions = {
          from: 'YOUR_EMAIL',
          to: email[i],
          subject: 'New Announcement',
          text: 'Please Check your CMS Account to view announcement'
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
        announcment: announcment,
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

exports.getAnnouncment = async function (req, res) {
  try {
    const announcment = await _ANNOUNCEMENT.find();

    res.status(201).json({
      status: "success",
      data: {
        announcment: announcment,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.updateAnnouncment = async function (req, res) {
  try {
    var member = await _ANNOUNCEMENT.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      data: {
        announcment: member,
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
    var member = await _ANNOUNCEMENT.findByIdAndRemove(req.params.id);

    res.status(201).json({
      status: "success",
      data: {
        announcment: member,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
