import axios from "axios";

const URL_TIMETABLE = "http://localhost:8000/v1/timetable";

export const addTimeTable = async (object) => {
  console.log(object);
  const member = await axios.post(URL_TIMETABLE, object);
  console.log(member.data.data.timetable);
  return member.data.data.timetable;
};

export const getTimetable = async (params) => {
  const member = await axios.get(URL_TIMETABLE + "?" + params);

  return member.data.data.timetable;
};

export const delTimeTable = async (id) => {
  const timeTable = await axios.delete(URL_TIMETABLE + "/" + id);

  return timeTable.status;
};
