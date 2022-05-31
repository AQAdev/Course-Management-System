import axios from "axios";

const URL_TOPIC = "http://localhost:8000/v1/topic";

export const getTopicByDate = async (date, course) => {
  let data = await axios.get(URL_TOPIC + `?date=${date}&course=${course}`);
  data = data.data.data;
  console.log({ data });
  if (!!data.topic.length) return 1;
  return 0;
};

export const topicByCourse = async (course) => {
  let data = await axios.get(URL_TOPIC + `?course=${course}`);
  data = data.data.data;
  return data;
};

export const getTopicByDateAndCourse = async (date, course) => {
  let data = await axios.get(URL_TOPIC + `?date=${date}&course=${course}`);
  data = data.data.data;
  return data;
};

export const getTopicAndAttendance = async (params) => {
  let data = await axios.get(URL_TOPIC + +`?` + params);
  data = data.data.data;
  return data;
};
