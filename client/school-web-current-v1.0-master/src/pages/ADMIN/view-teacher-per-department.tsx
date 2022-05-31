import { FC, useState } from "react";
import ShowTeacher from "../../components/card-show-members";
import CustomDropDown from "../../components/custom-dropdown";
const data = [
  "America",
  "India",
  "Australia",
  "Argentina",
  "Ireland",
  "Indonesia",
  "Iceland",
  "Japan",
];
const ViewStudentPerDepartment: FC = () => {
  const [dropValue, setDropValue] = useState("");

  return (
    <>
      <CustomDropDown
        items={data}
        placeHolder="Select Derpartment"
        dropDownValue={dropValue}
        setDropDownValue={setDropValue}
        w="40%"
        lable="Select Department"
      ></CustomDropDown>

      <ShowTeacher title="Total Teacher" members="2030"></ShowTeacher>
    </>
  );
};

export default ViewStudentPerDepartment;
