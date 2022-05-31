const _ATTENDANCE = require("../model/attendance");
const _SELECTEDCOURSE = require("../model/selectedcourse");
const _TOPIC = require("../model/topic");

exports.addAttendance = async function (req, res) {
  try {
    console.log(req.body);
    const Attendance = await _ATTENDANCE.insertMany(req.body);

    res.status(201).json({
      status: "success",
      data: {
        attendance: Attendance,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getAttendance = async function (req, res) {
  try {
    var query = require("url").parse(req.url, true).query;
    // console.log(query);

    const Attendance = await _ATTENDANCE
      .find(query)
      .populate("student")
      .populate("course")
      .populate("topic");

    res.status(201).json({
      status: "success",
      data: {
        attendance: Attendance,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

// get the in a couse

exports.getAttendanceInPercent = async function (req, res) {
  try {
    // course topic
    var query = require("url").parse(req.url, true).query;
    // console.log(query);
    console.log("batch attendence")

    // get students

    const studentsWithCourse = await _SELECTEDCOURSE
      .find(query)
      .populate("students");

    const studentAttendance = await _ATTENDANCE.find({
      course: query.course_id,
    });
    const topics = await _TOPIC.find({ course: query.course_id });
    let attendanceArray = [];
    for (let i = 0; i < studentsWithCourse[0].students.length; i = i + 1) {
      const data = calculateAttendance(
        studentsWithCourse[0].students[i],
        studentAttendance,
        topics.length
      );
      attendanceArray.push(data);
    }

    res.status(201).json({
      status: "success",
      data: {
        attendance: attendanceArray,
        // hours:
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

const calculateAttendance = (studentObject, allAttendanceObject, topic) => {
  const studentId = studentObject._id;
  // filter student
  const attendance = allAttendanceObject.filter(
    (el) =>
      studentId.toString() === el.student.toString() && el.creditHour !== "0"
  );
  if (!!attendance.length) {
    return {
      name: studentObject.stdName,
      attendance: attendance.length / topic,
    };
  } else {
    return {
      name: studentObject.stdName,
      attendance: attendance.length / topic,
    };
  }
};

// getStudentCourseAndAttendance
exports.getStudentCourseAndAttendance = async function (req, res) {
  try {
    // course topic
    var query = require("url").parse(req.url, true).query;
    console.log(query);

    // get student course

    const student_courses = await _SELECTEDCOURSE
      .find(query)
      .populate("course_id");
    console.log(student_courses);
    const topics = await _TOPIC.find({ topic: query.course });

    let attendace = [];

    // loop throug the doc and
    for (let i = 0; i < student_courses.length; i = i + 1) {
      const studentAttendance = await _ATTENDANCE.find({
        course: student_courses[0].course_id,
        student: query.students,
      });

      attendace.push({
        attendance: studentAttendance.length / topics.length,
        course_name: student_courses[i].course_id.course_title,
        course: student_courses[i].course_id._id,
        hours: student_courses[i].course_id.credit_hour,
      });
    }
    // get get coursesfrom Selected courses

    // const studentsWithCourse = await _SELECTEDCOURSE
    //   .find(query)
    //   .populate("students");

    // const studentAttendance = await _ATTENDANCE.find({
    //   course: query.course_id,
    // });
    // const topics = await _TOPIC.find({ course: query.course_id });
    // let attendanceArray = [];
    // for (let i = 0; i < studentsWithCourse[0].students.length; i = i + 1) {
    //   const data = calculateAttendance(
    //     studentsWithCourse[0].students[i],
    //     studentAttendance,
    //     topics.length
    //   );6249690629077e2c941ab558
    //   attendanceArray.push(data);
    // }

    res.status(201).json({
      status: "success",
      data: {
        student_attendance: attendace,

        // attendance: student_courses,
        // topic: topics,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getAttendanceByID = async function (req, res) {
  try {
    var Attendance = await _ATTENDANCE.findById(req.params.id);
    res.status(201).json({
      tatus: "success",
      data: {
        attendance: Attendance,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};

exports.updateAttendanceByID = async function (req, res) {
  try {
    var Attendance = await _ATTENDANCE.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      data: {
        attendance: Attendance,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};
