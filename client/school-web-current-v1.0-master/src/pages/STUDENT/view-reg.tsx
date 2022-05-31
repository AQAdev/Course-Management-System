import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainor from "../../components/page-containor";
import { STUDENT } from "../../constants/role";
// 6267d41512078e1a64658225
export const ViewStudentReg: FC = () => {
  return (
    <>
      <PageContainor role={STUDENT}>
        <>
          <div className="flex space-x-2">
            <Link to="/student/studentallcourses">
              {" "}
              <div className="bg-green-500 rounded px-4 py-2 text-white cursor-pointer">
                View Courses{" "}
              </div>
            </Link>

            <Link to="/student/StudentRegisterCourses">
              <div className="bg-green-500 rounded px-4 py-2 text-white cursor-pointer">
                Register Course{" "}
              </div>
            </Link>
          </div>
        </>
      </PageContainor>
    </>
  );
};
