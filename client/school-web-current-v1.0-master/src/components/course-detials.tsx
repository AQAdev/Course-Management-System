import { FC } from "react";
// update{yellow}-delete{red}-view{blue}-add{green}

interface ICourseDetials {
  title: string;
  teacher: string;
  creditHours: string;
}
const CourseDetial: FC<ICourseDetials> = ({ title, teacher, creditHours }) => {
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="">
        <div className="text-gray-400">Coruse Title</div>
        <div className="">{title}</div>
      </div>
      <div className="">
        <div className="text-gray-400">Teacher Name</div>
        <div className="">{teacher}</div>
      </div>
      <div className="">
        <div className="text-gray-400">Credit Hours</div>
        <div className="">{creditHours}</div>
      </div>
    </div>
  );
};

export default CourseDetial;
