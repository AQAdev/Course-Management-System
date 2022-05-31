import axios from "axios";
const URL = "http://localhost:8000/v1/program";

export const addProgram = async (object) => {
  const data = await axios.post(URL, object);
  return data.data.data;
};
