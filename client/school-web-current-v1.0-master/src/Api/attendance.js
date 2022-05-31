import axios from "axios";
import moment from "moment";

const URL_TOPIC = "http://localhost:8000/v1/topic";
const URL_ATTENDANCE = "http://localhost:8000/v1/attendance";

export const addTopic = async (topic, course) => {
  console.log({
    date: moment().format("L").toString(),
    descriptiopn: topic,
    course: course,
  });
  const data = await axios.post(URL_TOPIC, {
    date: moment().format("L").toString(),
    descriptiopn: topic,
    course: course,
  });
  return data.data.data;
};

export const addAttendance = async (attendance) => {
  const data = await axios.post(URL_ATTENDANCE, attendance);
  return data.data.data;
};

export const getAttendanceByTopic = async (course, topic, date) => {
  const data = await axios.get(
    URL_ATTENDANCE + `?topic=${topic}&course=${course}&date=${date.toString()}`
  );

  return data.data.data;
};

export const getAttendaceAndTopic = async (params) => {
  const data = await axios.get(URL_ATTENDANCE + `?` + params);
  return data.data.data;
};

export const teacherGetAttendanceSummery = async (course) => {
  const data = await axios.get(
    `http://localhost:8000/v1/attendance/precentage?course_id=${course}`
  );
  return data.data.data;
};

export const studentAttendanceCourse = async (params) => {
  const data = await axios.get(
    `http://localhost:8000/v1/attendance/courseAttendance` + params
  );
  return data.data.data;
};
