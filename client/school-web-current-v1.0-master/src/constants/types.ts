import { Dispatch, SetStateAction } from "react";

export interface ISideNavBar {
  showNavBar: boolean;
  setShowNavBar: Dispatch<SetStateAction<boolean>>;
}
