/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";

export const CreateAccount = () => {
  return (
    <>
      <PageContainor role={ADMIN}>
        <div className="flex space-x-4">
          <div className="p-2 px-8 bg-green-600 rounded text-white">
            <Link to="/admin/addstudent">
              <div
                // href="#"
                className="flex flex-row items-center h-12 transform  ease-in duration-200  "
              >
                <span className="text-sm font-medium">Add Student</span>
              </div>
            </Link>
          </div>
          <div className="p-2 px-8 bg-green-600 rounded text-white">
            <Link to="/admin/addteacher">
              <div
                // href="#"
                className="flex flex-row items-center h-12 transform  ease-in duration-200  "
              >
                <span className="text-sm font-medium">Add Teacher</span>
              </div>
            </Link>
          </div>
        </div>
      </PageContainor>
    </>
  );
};
