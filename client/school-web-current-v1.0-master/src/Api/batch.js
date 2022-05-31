import axios from "axios";

const URL_BATCH = "http://localhost:8000/v1/batch";
const URL_SECTION = "http://localhost:8000/v1/section";
const URL_PROGRAM = "http://localhost:8000/v1/program";

export const getAllBtach = async () => {
  const data = await axios.get(URL_BATCH);
  return data.data.data;
};

export const getAllSection = async () => {
  const data = await axios.get(URL_SECTION);
  return data.data.data;
};

export const getAllProgram = async () => {
  const data = await axios.get(URL_PROGRAM);
  return data.data.data;
};
export const addBatch = async (object) => {
  const data = await axios.post(URL_BATCH, object);
  return data.data.data;
};
