import axios from "axios";
const URL = "http://localhost:8000/v1/student/search";
const stdURL = "http://localhost:8000/v1/student";

export const studentById = async (id) => {
  const data = await axios.get(URL + "?stdID=" + id);

  return data.data.data.student;
};

export const updateStudent = async (id, object) => {
  const data = await axios.patch(stdURL + "/" + id, object);
  console.log(data.status);
  return data.status;
};
