import React, { Dispatch, FC, SetStateAction } from "react";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";

interface IDropDown {
  items: string[];
  dropDownValue: string;
  setDropDownValue: Dispatch<SetStateAction<string>>;
  w: string;
  placeHolder: string;
  lable: string;
}
const CustomDropDown: FC<IDropDown> = ({
  items,
  dropDownValue,
  lable,
  setDropDownValue,
  placeHolder,
  w,
}) => (
  <div className="w-full">
    <div className="mr-3">{lable}</div>
    <ComboBox
      options={items}
      onSelect={(event) => setDropDownValue(event)}
      placeholder={placeHolder}
      enableAutocomplete
      style={{ width: w }}
      className="bg-green-700 rounded flex justify-center items-center"
    />
  </div>
);

export default CustomDropDown;
