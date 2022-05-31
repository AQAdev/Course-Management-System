import { useState } from "react";
import { getUser } from "../utils/localStorageFunctions";

export const UseRole = () => {
  const [role, setRole] = useState("");

  const getRole = () => {
    const { user } = getUser();
    if (user) {
      setRole(user.role);
    }
  };

  return [role, getRole];
};
