import axios from "axios";
const URL = "http://localhost:8000/v1/section";

export const getSection = async (id) => {
  const data = await axios.get(URL);
  return data.data.data.section;
};
export const addSection = async (object) => {
  const data = await axios.post(URL, object);
  return data.data.data;
};
