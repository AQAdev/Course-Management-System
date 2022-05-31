import axios from "axios";
const URL = "http://localhost:8000/v1/selectedCours/detials";

export const teacherCourse = async (qs) => {
  console.log(qs);
  const data = await axios.get(URL + qs);
  return data.data.data;
};

export const getAllTeacher = async () => {
  const data = await axios.get("http://localhost:8000/v1/teacher");
  return data.data.data;
};
