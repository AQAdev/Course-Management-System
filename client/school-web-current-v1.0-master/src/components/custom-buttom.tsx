import { FC } from "react";
// update{yellow}-delete{red}-view{blue}-add{green}
interface ICustomButton {
  type: string;
  title: string;
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const CustomButton: FC<ICustomButton> = ({ type, title, action }) => {
  return (
    <>
      <>
        <button
          onClick={action}
          className={`w-[180px] h-12 flex justify-center items-center  rounded text-white ${
            type === "Delete" ? "bg-red-400" : ""
          } ${type === "Update" ? "bg-yellow-400" : ""} ${
            type === "Add" ? "bg-green-500" : ""
          } ${type === "View" ? "bg-green-700" : ""}`}
        >
          {title}
        </button>
      </>
    </>
  );
};

export default CustomButton;
