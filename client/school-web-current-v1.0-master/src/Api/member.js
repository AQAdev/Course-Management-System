import axios from "axios";

const URL_MEMBER = "http://localhost:8000/v1/member/";

export const updateMember = async (id, object) => {
  const member = await axios.patch(URL_MEMBER + id, object);
  return member.data.status;
};
