import axios from "axios";

const URL_COURSE = "http://localhost:8000/v1/courses";
const URL_SELECTED_COURSE = "http://localhost:8000/v1/selectedCourse";

export const addCourse = async (object) => {
  const data = await axios.post(URL_COURSE, object);
  return data.data.data;
};

export const getCourse = async () => {
  const data = await axios.get(URL_COURSE);
  return data.data.data;
};

export const getCourseByCourseCode = async (courseCode) => {
  const data = await axios.get(URL_COURSE + `/${courseCode}`);
  return data.data.data;
};

export const addSelectedCourse = async (object) => {
  const data = await axios.post(URL_SELECTED_COURSE, object);
  return data.data.data;
};

export const updateSelectedCourseStudents = async (id, students) => {
  const data = await axios.patch(URL_SELECTED_COURSE + id, students);

  return data;
};

export const getSelectedCourse = async (params) => {
  const data = await axios.get(
    "http://localhost:8000/v1/selectedCours/student" + params
  );
  return data.data.data;
};

export const getAllSelectedCourse = async (params) => {
  const data = await axios.get(
    "http://localhost:8000/v1/selectedCours/studentallcourses" + params
  );
  return data.data.data;
};
