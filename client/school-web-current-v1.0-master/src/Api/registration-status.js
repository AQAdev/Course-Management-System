import axios from "axios";

const URL_STATUS = "http://localhost:8000/v1/status";

export const getStatus = async (i) => {
  const member = await axios.get(URL_STATUS);
  return member.data.data.registration;
};

export const updateStatus = async (id, students) => {
  const data = await axios.patch(URL_STATUS + "/" + id, students);
  return data.data.data.registration;
};
