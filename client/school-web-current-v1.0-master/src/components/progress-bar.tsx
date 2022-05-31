import { FC } from "react";

const returnColor = (attendance: Number) => {
  if (attendance > 75) {
    return "bg-green-700";
  }
  if (attendance >= 70 && attendance <= 75) {
    return "bg-yellow-600";
  }
  if (attendance < 70) {
    return "bg-red-700";
  }
};
interface IProgressBar {
  attendance: Number;
}
const ProgressBar: FC<IProgressBar> = ({ attendance }) => {
  return (
    <>
      <div className="w-4/5 bg-gray-400 rounded-full ">
        <div
          className={`${returnColor(
            attendance
          )} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
          style={{ width: attendance + "%" }}
        >
          {attendance}%
        </div>
      </div>
      <div className="pr-14"></div>
    </>
  );
};

export default ProgressBar;
