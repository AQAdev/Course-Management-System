import React, { FC, useEffect } from "react";
import { ADMIN } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

interface IProtectedPage {
  children: React.ReactChild;
}

const ProtectedPage: FC<IProtectedPage> = ({ children }) => {
  const user = getUser();

  useEffect(() => {
    if (user !== null && user.role === ADMIN) {
    } else {
      // go to the signup page
    }
  }, [user]);
  return <div>{children}</div>;
};

export default ProtectedPage;
