import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/localStorageFunctions";
import ItemsContainor from "./Object-Containor/Items-containor";
import SideBar from "./side-bar";
import TopBar from "./top-bar";

interface IPageContainor {
  children: React.ReactChild;
  role: string | String;
}

const PageContainor: FC<IPageContainor> = ({ children, role }) => {
  // get router if admin the access this page
  const [showNavBar, setShowNavBar] = useState(false);
  const { user } = getUser();
  const navigation = useNavigate();

  useEffect(() => {
    // console.log("teas");
    if (!user) navigation("/sigin");
  }, [user, navigation]);
  if (user.role !== role) {
    return <>Invalid Access</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar showNavBar={showNavBar} setShowNavBar={setShowNavBar}></SideBar>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <TopBar showNavBar={showNavBar} setShowNavBar={setShowNavBar}></TopBar>
        <ItemsContainor>{children}</ItemsContainor>
      </div>
    </div>
  );
};

export default PageContainor;
