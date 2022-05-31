import { getDoc, doc } from "@firebase/firestore";
import { useState } from "react";
import { firestore } from "../config/firebase";

export const UseAccess = () => {
  const [valid, setValid] = useState("");

  const getUserData = async () => {
    const userDocument = doc(firestore, "access", "w9Yl9WUqRuWWqYdo9svq");
    const document = await getDoc(userDocument);

    if (!document.exists) {
      // eslint-disable-next-line no-throw-literal
      throw "User Does Not Exists";
    }

    let userData: any = document.data();
    return userData?.show;
  };
  const getData = async () => {
    const data = await getUserData();
    setValid(data);
  };

  getData();

  return [valid];
};
