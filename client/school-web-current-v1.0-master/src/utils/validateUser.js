import axios from "axios";
import { setUser } from "./localStorageFunctions";

const url = `http://localhost:8000/v1/member?`;

export const checkUser = async (email, password) => {
  const newURL = url + `email=${email}&password=${password}`;

  const member = await axios.get(newURL);
  if (member.data.total === 0) {
    return null;
  } else {
    setUser({
      user: member.data.data.member[0],
      user_information: member.data.data.member_information[0],
    });
  }
  return member.data.data.member[0];
};
