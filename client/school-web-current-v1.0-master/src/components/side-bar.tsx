/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { ISideNavBar } from "../constants/types";
import { deleteUser, getUser } from "../utils/localStorageFunctions";
import { Link, useNavigate } from "react-router-dom";

const SideBar: FC<ISideNavBar> = ({ showNavBar, setShowNavBar }) => {
  const navigation = useNavigate();
  useEffect(() => {}, []);

  const logout = () => {
    deleteUser();
    if (getUser()) return;
    navigation("/signin");
  };

  const { user } = getUser();
  // console.log(user);
  return (
    // hide for smaller screen and show the icons on the top seach bar
    <div
      className={` ${
        showNavBar ? "" : "hidden"
      } text-white lg:block bg-green-700`}
    >
      {/* <div className="flex justify-center items-center">{user.role}</div> */}
      <div className="min-h-screen flex flex-row ">
        <div className="flex flex-col w-56  overflow-hidden">
          <div className="flex  items-center pl-2 cursor-pointer h-[70px] shadow-md">
            {showNavBar ? (
              <>
                <svg
                  onClick={() => {
                    showNavBar ? setShowNavBar(false) : setShowNavBar(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </>
            ) : (
              ""
            )}
          </div>
          <ul className="flex flex-col py-4">
            

            {user && user.role === "TEACHER" && (
              <>
              <li>
              <a
                href="/teacher/dashboard"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
            </li>
                <li>
                  <Link to="/teacher/attendance">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Attendance</span>
                    </a>
                  </Link>
                  <Link to="/teacher/timetable">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Time Table</span>
                    </a>
                  </Link>
                  <li>
                    <li>
                      <Link to="/teacher/profile">
                        <a
                          // href="#"
                          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                        >
                          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                            <i className="bx bx-home"></i>
                          </span>
                          <span className="text-sm font-medium">Profile</span>
                        </a>
                      </Link>
                    </li>
                    <Link to="/admin/allannouncment">
                      <a
                        // href="#"
                        className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                          <i className="bx bx-home"></i>
                        </span>
                        <span className="text-sm font-medium">
                          All Announcments
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/allscholership">
                      <a
                        // href="#"
                        className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                      >
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                          <i className="bx bx-home"></i>
                        </span>
                        <span className="text-sm font-medium">
                          All Scholarships
                        </span>
                      </a>
                    </Link>
                  </li>
                </li>
              </>
            )}

            {user && user.role === "STUDENT" && (
              <>
              <li>
              <a
                href="/student/dashboard"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
            </li>
                <li>
                  <Link to="/student/courses">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Courses</span>
                    </a>
                  </Link>
                </li>
                <Link to="/student/timetable">
                  <a
                    // href="#"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">Time Table</span>
                  </a>
                </Link>
                <li>
                  <Link to="/student/announcement">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        All Announcments
                      </span>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/student/studentCourses">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Courses</span>
                    </a>
                  </Link>
                </li>
                <li></li>
                <li>
                  <Link to="/student/profile">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/allscholership">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        All Scholarships
                      </span>
                    </a>
                  </Link>
                </li>
              </>
            )}

            {user && user.role === "ADMIN" && (
              <>
                {/* /admin/addCourse */}

                <li>
              <a
                href="/admin/dashboard"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
            </li>
                
                <li>
                  <Link to="/teacher/attendance">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Attendance</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/createAccount">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        Create Account
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/course">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Course</span>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/admin/timetable">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Time Table</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/searchstudent">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        Search Student
                      </span>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/admin/addannouncment">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Announcment</span>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/admin/allannouncment">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        All Announcments
                      </span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/profile">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Profile</span>
                    </a>
                  </Link>
                </li> */}
                <li>
                  <Link to="/admin/addscholership">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">Scholarship</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/allscholership">
                    <a
                      // href="#"
                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  "
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white">
                        <i className="bx bx-home"></i>
                      </span>
                      <span className="text-sm font-medium">
                        All Scholarships
                      </span>
                    </a>
                  </Link>
                </li>
              </>
            )}

            <li>
              <div
                onClick={logout}
                className=" cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
